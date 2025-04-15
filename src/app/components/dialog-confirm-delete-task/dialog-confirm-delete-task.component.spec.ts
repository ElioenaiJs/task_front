import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmDeleteTaskComponent } from './dialog-confirm-delete-task.component';

describe('DialogConfirmDeleteTaskComponent', () => {
  let component: DialogConfirmDeleteTaskComponent;
  let fixture: ComponentFixture<DialogConfirmDeleteTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogConfirmDeleteTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfirmDeleteTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
