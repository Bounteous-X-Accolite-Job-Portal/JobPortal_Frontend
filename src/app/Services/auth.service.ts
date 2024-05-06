import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailValidator } from '@angular/forms';

import axios from 'axios';
import { location } from '../Models/JoblocationResponse/location';
import { Login } from '../Models/loginUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'https://localhost:7283/api/';

  constructor(private http: HttpClient) {}

  registerUser(registerData: any): Observable<any> {
   let body = registerData;
   let headers = new Headers({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': 'POST',
     'Access-Control-Allow-Headers': '*',
   })
    return this.http.post<any>(this.baseURL +'CandidateAccount/register',registerData);
  }

  loginUser(loginData: any): Observable<any> {
    console.log("login api");
    return this.http.post<Login>(this.baseURL + 'Account/login', loginData);
  }
}
