import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private auth : AuthService,
    private router: Router
  ) { }

  // canActivate(): boolean {
  //   if(this.auth.isLoggedIn()){
  //     return true;
  //   }

    this.router.navigate(['login'])
    return false;
  }

  canActivateChild() : boolean {
    if(this.auth.isLoggedIn()){
      return true;
    }

    this.router.navigate(['login'])
    return false;
  }

  isLoggedIn() : boolean {
    if(!this.auth.isLoggedIn()){
      return true;
    }

    this.router.navigate([''])
    return false;
  }
}
