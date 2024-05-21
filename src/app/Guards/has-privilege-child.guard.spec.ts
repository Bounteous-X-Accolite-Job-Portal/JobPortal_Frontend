import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { hasPrivilegeChildGuard } from './has-privilege-child.guard';

describe('hasPrivilegeChildGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasPrivilegeChildGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
