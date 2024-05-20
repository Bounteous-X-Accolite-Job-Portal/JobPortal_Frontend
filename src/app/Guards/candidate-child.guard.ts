import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { PermissionService } from '../Services/permission.service';

export const candidateChildGuard: CanActivateChildFn = (route, state) => {
  return inject(PermissionService).isCandidate();
};
