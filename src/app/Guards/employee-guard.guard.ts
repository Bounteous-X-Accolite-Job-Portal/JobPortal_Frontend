import { CanActivateFn } from '@angular/router';
import { PermissionService } from '../Services/permission.service';
import { inject } from '@angular/core';

export const employeeGuardGuard: CanActivateFn = (route, state) => {
  return inject(PermissionService).isEmployee();
};
