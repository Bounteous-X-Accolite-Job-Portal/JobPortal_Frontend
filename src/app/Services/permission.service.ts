import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserStoreService } from './user-store.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private auth : AuthService,
    private router: Router,
    private store: UserStoreService
  ) { }

  canActivate(): boolean {
    if(this.auth.isLoggedIn()){
      return true;
    }

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

  isEmployee() : boolean {
    let bool = this.auth.checkIsEmployeeFromToken();
    this.store.checkIsEmployeeFromStore().subscribe(val => {
        bool = bool || val;
    })

    
    if(bool){
      return true;
    }

    this.router.navigate([''])
    return false;
  }

  isCandidate() : boolean {
    let bool = this.auth.checkIsEmployeeFromToken();
    this.store.checkIsEmployeeFromStore().subscribe(val => {
        bool = bool || val;
    })

    if(!bool){
      return true;
    }

    this.router.navigate([''])
    return false;
  }

  hasPrivilege() : boolean {
    let bool = this.auth.checkHasPrivilegeFromToken();
    this.store.checkHasPrivilegeFromStore().subscribe(val => {
        bool = bool || val;
    })

    if(bool){
      return true;
    }

    this.router.navigate(['employee-dashboard'])
    return false;
  }

  hasSpecialPrivilege() : boolean {
    let bool = this.auth.checkHasSpecialPrivilegeFromToken();
    this.store.checkHasSpecialPrivilegeFromStore().subscribe(val => {
        bool = bool || val;
    })

    if(bool){
      return true;
    }

    this.router.navigate(['employee-dashboard'])
    return false;
  }
}
