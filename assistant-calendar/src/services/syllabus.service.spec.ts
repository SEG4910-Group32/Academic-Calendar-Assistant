import { TestBed } from '@angular/core/testing';

import { SyllabusService } from './syllabus.service';

describe('SyllabusService', () => {
  let service: SyllabusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyllabusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
