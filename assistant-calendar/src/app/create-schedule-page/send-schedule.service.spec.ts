import { TestBed } from '@angular/core/testing';

import { SendScheduleService } from './send-schedule.service';

describe('SendScheduleService', () => {
  let service: SendScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
