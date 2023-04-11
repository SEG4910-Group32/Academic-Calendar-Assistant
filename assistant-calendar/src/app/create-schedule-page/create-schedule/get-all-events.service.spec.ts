import { TestBed } from '@angular/core/testing';

import { GetAllEventsService } from './get-all-events.service';

describe('GetAllEventsService', () => {
  let service: GetAllEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
