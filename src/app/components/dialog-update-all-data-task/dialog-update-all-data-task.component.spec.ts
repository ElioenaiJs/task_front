import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateAllDataTaskComponent } from './dialog-update-all-data-task.component';

describe('DialogUpdateAllDataTaskComponent', () => {
  let component: DialogUpdateAllDataTaskComponent;
  let fixture: ComponentFixture<DialogUpdateAllDataTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUpdateAllDataTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUpdateAllDataTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
