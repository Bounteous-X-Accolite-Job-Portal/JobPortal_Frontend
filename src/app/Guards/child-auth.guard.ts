import { CanActivateFn } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { PermissionService } from '../Services/permission.service';
import { CanActivateChildFn } from '@angular/router';

export const childAuthGuard: CanActivateChildFn = (route, state) => {
  return inject(PermissionService).canActivateChild();
};
