import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { Task } from '../layout/layout.component';
import { UriConstants } from '../../../utils/uris.constants';

@Component({
  selector: 'app-dialog-update-task',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './dialog-update-task.component.html',
  styleUrls: ['./dialog-update-task.component.scss']
})
export class DialogUpdateTaskComponent {
  protected dialogRef = inject(MatDialogRef<DialogUpdateTaskComponent>);
  protected data = inject(MAT_DIALOG_DATA);
  private userService = inject(ApiService);

  onClose(): void {
    this.dialogRef.close();
  }

  confirmCompletion(): void {
    const payload = {
      title: this.data.task.title,
      description: this.data.task.description,
      due_date: this.data.task.due_date,
      completed: true  // Campo que realmente cambia
    };

    this.userService.putService({
      url: UriConstants.UPDATE_TASK(this.data.task.id),
      data: payload,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error updating task:', error);
        // Muestra detalles del error en consola
        if (error.error) {
          console.log('Error details:', error.error);
        }
      }
    });
  }

}