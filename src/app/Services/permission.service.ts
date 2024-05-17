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
}
