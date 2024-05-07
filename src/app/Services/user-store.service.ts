import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private email$ = new BehaviorSubject<string>("");
  private isEmployee$ = new BehaviorSubject<boolean>(false);
  private role$ = new BehaviorSubject<string>("");
  private id$ = new BehaviorSubject<string>("");
  private name$ = new BehaviorSubject<string>("");

  constructor() { }
  
  public getEmailFromStore(){
    return this.email$.asObservable();
  }

  public setEmailForStore(email : string){
    this.email$.next(email);
  }

  public getNameFromStore(){
    return this.name$.asObservable();
  }

  public setNameForStore(name : string){
    this.name$.next(name);
  }

  public checkIsEmployeeFromStore(){
    return this.isEmployee$.asObservable();
  }
  
  public setIsEmployeeForStore(isEmployee : boolean){
    this.isEmployee$.next(isEmployee);
  }
  
  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role : string){
    this.role$.next(role);
  }

  public getIdFromStore(){
    return this.id$.asObservable();
  }

  public setIdForStore(id : string){
    this.id$.next(id);
  }
}

