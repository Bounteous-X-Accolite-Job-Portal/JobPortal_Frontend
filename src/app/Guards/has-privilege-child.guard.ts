import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { PermissionService } from '../Services/permission.service';

export const hasPrivilegeChildGuard: CanActivateChildFn = (childRoute, state) => {
  return inject(PermissionService).hasPrivilege();
};
