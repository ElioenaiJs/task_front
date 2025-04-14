import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ApiService } from '../../../services/api.service';
import { UriConstants } from '../../../utils/uris.constants';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-insert-task',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule, 
    MatFormFieldModule, 
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonModule
  ],
  templateUrl: './dialog-insert-task.component.html',
  styleUrl: './dialog-insert-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class DialogInsertTaskComponent {
  private readonly apiService = inject(ApiService);
  private readonly dialogRef = inject(MatDialogRef<DialogInsertTaskComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]), 
    due_date: new FormControl<Date | null>(null, [Validators.required]),
    completed: new FormControl(false),
  });

  createTask() {
    console.log('Form values:', this.taskForm.value);
    if (this.taskForm.invalid) return;

    this.apiService.postService({
      url: UriConstants.CREATE_TASK,
      data: this.taskForm.value,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'  
      }
    }).subscribe({
      next: (response) => {
        console.log('Task created successfully:', response);
        this.dialogRef.close(response); 
      },
      error: (error) => {
        console.error('Error creating task:', error);
      }
    });
  }
}