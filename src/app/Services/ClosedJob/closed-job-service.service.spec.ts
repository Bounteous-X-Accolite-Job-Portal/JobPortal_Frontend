import { TestBed } from '@angular/core/testing';

import { ClosedJobServiceService } from './closed-job-service.service';

describe('ClosedJobServiceService', () => {
  let service: ClosedJobServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClosedJobServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
