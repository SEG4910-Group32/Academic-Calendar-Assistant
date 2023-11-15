import { TestBed } from '@angular/core/testing';

import { SearchSchedulesService } from './search-schedules.service';

describe('SearchSchedulesService', () => {
  let service: SearchSchedulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchSchedulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
