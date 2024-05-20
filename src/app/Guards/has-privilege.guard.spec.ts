import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasPrivilegeGuard } from './has-privilege.guard';

describe('hasPrivilegeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasPrivilegeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
