import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PermissionService } from '../Services/permission.service';

export const hasPrivilegeGuard: CanActivateFn = (route, state) => {
  return inject(PermissionService).hasPrivilege();
};
