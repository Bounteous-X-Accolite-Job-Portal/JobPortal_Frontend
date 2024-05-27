import { TestBed } from '@angular/core/testing';

import { ReferralServiceService } from './referral-service.service';

describe('ReferralServiceService', () => {
  let service: ReferralServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferralServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
