import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { hasSpecialPrivilegeChildGuard } from './has-special-privilege-child.guard';

describe('hasSpecialPrivilegeChildGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasSpecialPrivilegeChildGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
