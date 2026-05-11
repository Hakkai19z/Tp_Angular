import { Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';

type Filter = 'all' | 'active' | 'done';

@Component({
  selector: 'app-task-list',
  imports: [AsyncPipe, DatePipe, TaskItemComponent, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  private taskService = inject(TaskService);

  private filterSubject = new BehaviorSubject<Filter>('all');
  filter$ = this.filterSubject.asObservable();

  filteredTasks$: Observable<Task[]> = combineLatest([
    this.taskService.getTasks(),
    this.filter$
  ]).pipe(
    map(([tasks, filter]) => {
      if (filter === 'active') return tasks.filter(t => !t.done);
      if (filter === 'done')   return tasks.filter(t => t.done);
      return tasks;
    })
  );

  remaining$: Observable<number> = this.taskService.getTasks().pipe(
    map(tasks => tasks.filter(t => !t.done).length)
  );

  history$ = this.taskService.getHistory();

  showHistory = false;

  setFilter(f: Filter) { this.filterSubject.next(f); }

  onAdd(title: string)  { this.taskService.addTask(title); }
  onToggle(id: number)  { this.taskService.toggleTask(id); }
  onDelete(id: number)  { this.taskService.deleteTask(id); }
  onClearDone()         { this.taskService.clearDone(); }
  onClearHistory()      { this.taskService.clearHistory(); }
}
