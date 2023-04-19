import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskDrawerComponent } from './add-task-drawer.component';

describe('AddTaskDrawerComponent', () => {
  let component: AddTaskDrawerComponent;
  let fixture: ComponentFixture<AddTaskDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
