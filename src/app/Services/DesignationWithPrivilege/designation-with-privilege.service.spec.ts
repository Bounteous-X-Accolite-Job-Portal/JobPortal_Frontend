import { TestBed } from '@angular/core/testing';

import { DesignationWithPrivilegeService } from './designation-with-privilege.service';

describe('DesignationWithPrivilegeService', () => {
  let service: DesignationWithPrivilegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignationWithPrivilegeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
