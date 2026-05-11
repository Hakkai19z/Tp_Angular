import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

const STORAGE_KEY_TASKS   = 'todo_tasks';
const STORAGE_KEY_HISTORY = 'todo_history';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[]   = this.load(STORAGE_KEY_TASKS, [
    { id: 1, title: 'Apprendre Angular', done: false, createdAt: new Date() },
    { id: 2, title: 'Construire la TodoList', done: false, createdAt: new Date() }
  ]);

  private history: Task[] = this.load(STORAGE_KEY_HISTORY, []);

  private tasksSubject   = new BehaviorSubject<Task[]>(this.tasks);
  private historySubject = new BehaviorSubject<Task[]>(this.history);

  getTasks():   Observable<Task[]> { return this.tasksSubject.asObservable(); }
  getHistory(): Observable<Task[]> { return this.historySubject.asObservable(); }

  addTask(title: string): void {
    if (!title.trim()) return;
    this.tasks = [...this.tasks, {
      id: Date.now(), title: title.trim(), done: false, createdAt: new Date()
    }];
    this.save(STORAGE_KEY_TASKS, this.tasks);
    this.tasksSubject.next(this.tasks);
  }

  toggleTask(id: number): void {
    this.tasks = this.tasks.map(t =>
      t.id === id ? { ...t, done: !t.done, completedAt: !t.done ? new Date() : undefined } : t
    );
    this.save(STORAGE_KEY_TASKS, this.tasks);
    this.tasksSubject.next(this.tasks);
  }

  deleteTask(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task?.done) {
      this.history = [{ ...task, completedAt: task.completedAt ?? new Date() }, ...this.history];
      this.save(STORAGE_KEY_HISTORY, this.history);
      this.historySubject.next(this.history);
    }
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save(STORAGE_KEY_TASKS, this.tasks);
    this.tasksSubject.next(this.tasks);
  }

  clearDone(): void {
    const done = this.tasks.filter(t => t.done).map(t => ({
      ...t, completedAt: t.completedAt ?? new Date()
    }));
    this.history = [...done, ...this.history];
    this.tasks   = this.tasks.filter(t => !t.done);
    this.save(STORAGE_KEY_TASKS,   this.tasks);
    this.save(STORAGE_KEY_HISTORY, this.history);
    this.tasksSubject.next(this.tasks);
    this.historySubject.next(this.history);
  }

  clearHistory(): void {
    this.history = [];
    this.save(STORAGE_KEY_HISTORY, this.history);
    this.historySubject.next(this.history);
  }

  private save(key: string, data: Task[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private load(key: string, defaults: Task[]): Task[] {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return defaults;
      return (JSON.parse(raw) as Task[]).map(t => ({
        ...t,
        createdAt:   new Date(t.createdAt),
        completedAt: t.completedAt ? new Date(t.completedAt) : undefined
      }));
    } catch {
      return defaults;
    }
  }
}
