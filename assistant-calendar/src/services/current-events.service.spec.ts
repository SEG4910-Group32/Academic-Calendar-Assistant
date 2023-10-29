import { TestBed } from '@angular/core/testing';

import { CurrentEventsService } from './current-events.service';

describe('CurrentEventsService', () => {
  let service: CurrentEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
