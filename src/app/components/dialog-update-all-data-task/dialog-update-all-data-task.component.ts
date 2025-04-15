import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { UriConstants } from '../../../utils/uris.constants';
import { Task } from '../layout/layout.component';

@Component({
  selector: 'app-dialog-update-all-data-task',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './dialog-update-all-data-task.component.html',
  styleUrls: ['./dialog-update-all-data-task.component.scss']
})
export class DialogUpdateAllDataTaskComponent {
  protected dialogRef = inject(MatDialogRef<DialogUpdateAllDataTaskComponent>);
  protected data = inject(MAT_DIALOG_DATA) as { task: Task };
  private userService = inject(ApiService);

  originalTask: Task = { ...this.data.task };
  task: Task = {
    ...this.data.task,
    completed: this.data.task.completed,
    due_date: this.data.task.due_date
  };

  onClose(): void {
    this.dialogRef.close();
  }

  updateTaskData(): void {
    const { id, completed, ...updateData } = this.task;

    this.userService.putService({
      url: UriConstants.UPDATE_TASK(id),
      data: {
        ...updateData,
        completed: this.originalTask.completed
      },
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (updatedTask) => {
        this.dialogRef.close({
          ...updatedTask,
          completed: this.originalTask.completed
        });
      },
      error: (error) => {
        console.error('Error updating task:', error);
        if (error.error) {
          console.log('Error details:', error.error);
        }
      }
    });
  }

  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // "yyyy-MM-dd"
  }

}