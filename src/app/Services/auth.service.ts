import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailValidator } from '@angular/forms';

import axios from 'axios';
import { location } from '../Models/JoblocationResponse/location';
import { Login } from '../Models/loginUser';
import { CookieServiceService } from './cookie-service.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private baseURL = 'https://localhost:7283/api/';

  constructor(
    private http: HttpClient,
    private cookieService : CookieServiceService

  ) {}

  registerUser(registerData: any): Observable<any> {
    // Assuming you are making an HTTP POST request to the backend API
    return this.http.post<any>(this.baseURL +'CandidateAccount/register', registerData);
  }

  loginUser(loginData: any): Observable<any> {
    console.log("login api");
    return this.http.post<Login>(this.baseURL + 'Account/login', loginData);
  }

  getResumes(id: any): Observable<any>{
    return this.http.get(this.baseURL + "Resume/resume/" + id);
  }

  storeToken(tokenValue: string){
    this.cookieService.set("Token", tokenValue);
    //localStorage.setItem('token', tokenValue);
  }

  getToken(){
    return this.cookieService.get("Token");
    //return localStorage.getItem('token');
  }

  isLoggedIn(): boolean{
    return !!this.cookieService.get("Token");
    //return !!localStorage.getItem('token');
  }
}
