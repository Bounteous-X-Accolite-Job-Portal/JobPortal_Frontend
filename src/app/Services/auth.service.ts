import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import { LoginResponse } from '../Models/loginResponse';
import { Router } from '@angular/router';

import { jwtDecode } from "jwt-decode";
import { environment } from '../../environments/environment.development';

import { SpinnerService } from './spinner.service';
import { ResponseModal } from '../Models/ResponseModal';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userPayload : any;

  // emits event on login
  AuthEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private spinnerService: SpinnerService,
  ) {
    this.userPayload = this.decodedToken();
  }

  registerUser(registerData: any): Observable<any> {
    // Assuming you are making an HTTP POST request to the backend API
    return this.http.post<any>(environment.baseURL +'CandidateAccount/register', registerData);
  }

  loginUser(loginData: any): Observable<any> {
    return this.http.post<LoginResponse>(environment.baseURL + 'Account/login', loginData);
  }

  logoutFromBackend(): Observable<ResponseModal> {
    return this.http.post<ResponseModal>(environment.baseURL + "Account/logout", null);
  }

  logout()
  {
    this.spinnerService.showSpinner();

    this.removeToken();
    this.AuthEvent.emit(false);

    this.spinnerService.hideSpinner();
  }

  getResumes(id: any): Observable<any>{
    return this.http.get(environment.baseURL + "Resume/resume/" + id);
  }

  storeToken(tokenValue: string)
  {
    this.cookieService.set("token", tokenValue, 30, '/', environment.baseURL, true, 'Lax');
  }

  getToken()
  {
    return this.cookieService.get("token");
  }

  removeToken()
  {
    this.spinnerService.showSpinner();
    this.cookieService.delete("token", '/');
    this.spinnerService.hideSpinner();
  }

  isLoggedIn(): boolean
  {
    return this.cookieService.check("token");
  }

  decodedToken()
  {
    const token = this.getToken();
    if (!token) {
      return null; // Handle case where token is not available
    }

    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null; // Handle decoding errors gracefully
    }
  }

  getEmailFromToken(){
    if(this.userPayload){
      return this.userPayload.Email;
    }
  }

  getNameFromToken(){
    if(this.userPayload){
      return this.userPayload.Name;
    }
  }

  checkIsEmployeeFromToken(){
    if(this.userPayload)
      return this.userPayload.IsEmployee;

    return false;
  }

  checkHasPrivilegeFromToken(){
    if(this.userPayload)
      return this.userPayload.HasPrivilege;

    return false;
  }

  checkHasSpecialPrivilegeFromToken(){
    if(this.userPayload)
      return this.userPayload.HasSpecialPrivilege;

    return false;
  }

  getRoleFromToken(){
    if(this.userPayload)
      return this.userPayload.Role;
  }

  getIdFromToken(){
    if(this.userPayload)
      return this.userPayload.Id;
  }
}
