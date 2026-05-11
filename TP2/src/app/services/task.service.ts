import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [
    { id: 1, title: 'Apprendre Angular', done: false, createdAt: new Date() },
    { id: 2, title: 'Construire la TodoList', done: false, createdAt: new Date() }
  ];

  private history: Task[] = [];

  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  private historySubject = new BehaviorSubject<Task[]>(this.history);

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  getHistory(): Observable<Task[]> {
    return this.historySubject.asObservable();
  }

  addTask(title: string): void {
    if (!title.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      done: false,
      createdAt: new Date()
    };
    this.tasks = [...this.tasks, newTask];
    this.tasksSubject.next(this.tasks);
  }

  toggleTask(id: number): void {
    this.tasks = this.tasks.map(t =>
      t.id === id ? { ...t, done: !t.done, completedAt: !t.done ? new Date() : undefined } : t
    );
    this.tasksSubject.next(this.tasks);
  }

  deleteTask(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task?.done) {
      this.history = [{ ...task, completedAt: task.completedAt ?? new Date() }, ...this.history];
      this.historySubject.next(this.history);
    }
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.tasksSubject.next(this.tasks);
  }

  clearDone(): void {
    const done = this.tasks.filter(t => t.done).map(t => ({
      ...t, completedAt: t.completedAt ?? new Date()
    }));
    this.history = [...done, ...this.history];
    this.historySubject.next(this.history);
    this.tasks = this.tasks.filter(t => !t.done);
    this.tasksSubject.next(this.tasks);
  }

  clearHistory(): void {
    this.history = [];
    this.historySubject.next(this.history);
  }
}
