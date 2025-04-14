import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { UriConstants } from '../../../utils/uris.constants';

@Component({
  selector: 'app-layout',
  imports: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  public userService = inject(ApiService);

  ngOnInit() {
    this.getAllTasks();
  }

  // layout.component.ts
  getAllTasks() {
    this.userService.getService({
      url: UriConstants.GET_TASKS,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'  
      }
    }).subscribe({
      next: (response) => {
        console.log('Tasks fetched successfully:', response);
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        if (error.status === 422) {
          console.warn('Validation error:', error.error.detail);
        }
      }
    });
  }
}
