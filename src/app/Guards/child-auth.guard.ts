import { CanActivateFn } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { PermissionService } from '../Services/permission.service';

export const childAuthGuard: CanActivateFn = (route, state) => {
  return inject(PermissionService).canActivateChild();
};
