import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import { Login } from '../Models/loginUser';
import { Router } from '@angular/router';

import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'https://localhost:7283/api/';
  private userPayload : any;

  // emits event on login
  AuthEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
  ) {
    this.userPayload = this.decodedToken();
  }

  registerUser(registerData: any): Observable<any> {
    return this.http.post<any>(this.baseURL +'CandidateAccount/register', registerData);
  }

  loginUser(loginData: any): Observable<any> {
    return this.http.post<Login>(this.baseURL + 'Account/login', loginData);
  }

  logout()
  {
    this.removeToken();
    this.AuthEvent.emit(false);
    this.router.navigate(['login']);
  }

  getResumes(id: any): Observable<any>
  {
    return this.http.get(this.baseURL + "Resume/resume/" + id);
  }

  storeToken(tokenValue: string)
  {
    this.cookieService.set("token", tokenValue, 30, '/', 'localhost', true, 'Lax');
  }

  getToken()
  {
    return this.cookieService.get("token");
  }

  removeToken()
  {
    this.cookieService.delete("token");
  }

  isLoggedIn(): boolean
  {
    return !!this.cookieService.get("token");
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
