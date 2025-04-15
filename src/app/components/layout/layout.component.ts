import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { UriConstants } from '../../../utils/uris.constants';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DialogInsertTaskComponent } from '../dialog-insert-task/dialog-insert-task.component';
import { DialogUpdateTaskComponent } from '../dialog-update-task/dialog-update-task.component';
import { DialogConfirmDeleteTaskComponent } from '../dialog-confirm-delete-task/dialog-confirm-delete-task.component';
import { DialogUpdateAllDataTaskComponent } from '../dialog-update-all-data-task/dialog-update-all-data-task.component';
export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  due_date: string;
}

@Component({
  selector: 'app-layout',
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  public userService = inject(ApiService);
  public tasks: Task[] = [];
  public taskPending: Task[] = [];
  public taskComplet: Task[] = [];
  public taskOverdue: Task[] = [];
  public dialog = inject(MatDialog);

  ngOnInit() {
    this.refreshTaskLists();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogInsertTaskComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasks.push(result);
      }
      this.refreshTaskLists();
    });
  }

  pendingtasks() {
    this.userService.getService({
      url: UriConstants.GET_TASKS_PENDING,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (response) => {
        console.log('Pending tasks:', response);
        this.taskPending = response.filter((task: Task) => !task.completed);
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        if (error.status === 422) {
          console.warn('Validation error:', error.error.detail);
        }
      }
    });
  }

  completedtasks() {
    this.userService.getService({
      url: UriConstants.GET_TASKS,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (response) => {
        this.taskComplet = response.filter((task: Task) => task.completed);
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        if (error.status === 422) {
          console.warn('Validation error:', error.error.detail);
        }
      }
    });
  }

  getAllTasks() {
    this.userService.getService({
      url: UriConstants.GET_TASKS,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (response) => {
        this.tasks = response;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        if (error.status === 422) {
          console.warn('Validation error:', error.error.detail);
        }
      }
    });
  }

  deleteTask(task: Task) {
    const dialogRef = this.dialog.open(DialogConfirmDeleteTaskComponent, {
      width: '600px',
      data: { task } 
    });
  
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.removeTaskFromAllLists(task.id);
  
        this.userService.deleteService({
          url: `${UriConstants.DELETE_TASK}/${task.id}`,
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).subscribe({
          next: () => {
            this.overdueTasks();
          },
          error: (error) => {
            this.refreshTaskLists();
          }
        });
      }
    });
  }

  updateTask(task: Task) {
    const dialogRef = this.dialog.open(DialogUpdateTaskComponent, {
      width: '600px',
      data: {task}
    });

    dialogRef.afterClosed().subscribe((updatedTask: Task | false) => {
      if (updatedTask) {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      }
      this.refreshTaskLists();
    });
  }

  overdueTasks() {
    this.userService.getService({
      url: UriConstants.GET_TASKS_OVER,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (response) => {
        this.taskOverdue = response;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  updateAllDataTasks(task: Task) {
    const dialogRef = this.dialog.open(DialogUpdateAllDataTaskComponent, {
      width: '600px',
      data: { task }
    });

    dialogRef.afterClosed().subscribe((updatedTask: Task | false) => {
      if (updatedTask) {
        this.refreshTaskLists();
      }
    });
  }

  formatStringDate(dateString: string): string {
    if (!dateString) return 'Sin fecha';
    return new Date(dateString).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  private removeTaskFromAllLists(taskId: number) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.taskPending = this.taskPending.filter(t => t.id !== taskId);
    this.taskComplet = this.taskComplet.filter(t => t.id !== taskId);
    this.taskOverdue = this.taskOverdue.filter(t => t.id !== taskId);
  }

  private refreshTaskLists() {
    this.completedtasks();
    this.pendingtasks();
    this.getAllTasks();
    this.overdueTasks();
  }
}

