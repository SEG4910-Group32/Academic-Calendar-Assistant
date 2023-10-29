import { TestBed } from '@angular/core/testing';

import { SendSubscribeService } from './send-subscribe.service';

describe('SendSubscribeService', () => {
  let service: SendSubscribeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendSubscribeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
