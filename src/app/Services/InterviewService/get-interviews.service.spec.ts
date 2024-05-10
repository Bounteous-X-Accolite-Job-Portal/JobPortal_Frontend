import { TestBed } from '@angular/core/testing';

import { GetInterviewsService } from './get-interviews.service';

describe('GetInterviewsService', () => {
  let service: GetInterviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetInterviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
