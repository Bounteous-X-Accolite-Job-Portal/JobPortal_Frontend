import { CanActivateChildFn } from '@angular/router';
import { PermissionService } from '../Services/permission.service';
import { inject } from '@angular/core';

export const childEmployeeGuardGuard: CanActivateChildFn = (route, state) => {
  return inject(PermissionService).isEmployee();
};
