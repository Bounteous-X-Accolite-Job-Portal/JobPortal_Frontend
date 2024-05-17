import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasSpecialPrivilegeGuard } from './has-special-privilege.guard';

describe('hasSpecialPrivilegeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasSpecialPrivilegeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
