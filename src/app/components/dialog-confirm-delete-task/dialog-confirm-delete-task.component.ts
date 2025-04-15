import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { UriConstants } from '../../../utils/uris.constants';

@Component({
  selector: 'app-dialog-confirm-delete-task',
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './dialog-confirm-delete-task.component.html',
  styleUrl: './dialog-confirm-delete-task.component.scss'
})
export class DialogConfirmDeleteTaskComponent {
  protected dialogRef = inject(MatDialogRef<DialogConfirmDeleteTaskComponent>);
  protected data = inject(MAT_DIALOG_DATA);
  private userService = inject(ApiService);

  onClose(): void {
    this.dialogRef.close();
  }

  deleteTask(){
    this.userService.deleteService({
      url: UriConstants.DELETE_TASK(this.data.task.id),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: () => {
        this.dialogRef.close(true);

      },
      error: (error) => {
        console.error('Error deleting task:', error);
      }
    });
  }
}
