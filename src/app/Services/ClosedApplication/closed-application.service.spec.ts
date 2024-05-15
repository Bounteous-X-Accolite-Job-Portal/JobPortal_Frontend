import { TestBed } from '@angular/core/testing';

import { ClosedApplicationService } from './closed-application.service';

describe('ClosedApplicationService', () => {
  let service: ClosedApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClosedApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
