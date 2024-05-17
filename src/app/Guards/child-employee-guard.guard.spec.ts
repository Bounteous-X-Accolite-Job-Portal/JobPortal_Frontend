import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { childEmployeeGuardGuard } from './child-employee-guard.guard';

describe('childEmployeeGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => childEmployeeGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
