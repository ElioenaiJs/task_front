import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { UriConstants } from '../../../utils/uris.constants';
import { MatDialog } from '@angular/material/dialog';
import { DialogInsertTaskComponent } from '../dialog-insert-task/dialog-insert-task.component';
export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

@Component({
  selector: 'app-layout',
  imports: [],
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
    this.getAllTasks();
    this.pendingtasks();
    this.completedtasks();
    this.overdueTasks();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogInsertTaskComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasks.push(result);
      }
    });
  }

  pendingtasks() {
    this.userService.getService({
      url: UriConstants.GET_TASKS,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (response) => {
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

  deleteTask(id: number) {
    this.userService.deleteService({
      url: UriConstants.DELETE_TASK(id),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: () => {
        this.getAllTasks();
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      }
    });
  }

  updateTask(task: Task) {
    this.userService.patchService({
      url: UriConstants.UPDATE_TASK(task.id),
      data: task,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: () => {
        this.getAllTasks();
      },
      error: (error) => {
        console.error('Error updating task:', error);
      }
    });
  }

  getTaskById(id: number) {
    this.userService.getService({
      url: UriConstants.GET_TASK(id),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (response) => {
        console.log('Task details:', response);
      },
      error: (error) => {
        console.error('Error fetching task:', error);
      }
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
}

