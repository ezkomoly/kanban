import { TestBed } from '@angular/core/testing';

import { TaskDrawerService } from './task-drawer.service';

describe('TaskDrawerService', () => {
  let service: TaskDrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskDrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
