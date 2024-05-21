import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { candidateChildGuard } from './candidate-child.guard';

describe('candidateChildGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => candidateChildGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
