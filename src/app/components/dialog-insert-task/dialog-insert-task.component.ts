import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-dialog-insert-task',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatDatepickerModule],
  standalone: true,
  templateUrl: './dialog-insert-task.component.html',
  styleUrl: './dialog-insert-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class DialogInsertTaskComponent {
  data = inject(MAT_DIALOG_DATA);
}
