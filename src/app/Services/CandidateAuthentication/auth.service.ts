import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import axios from 'axios';
import { ILogin } from '../../Models/login.interface';
import { IRegister } from '../../Models/register.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'http://localhost:5234/api/';

  constructor(private http: HttpClient) {}

  registerUser(registerData: any): Observable<any> {
    // Assuming you are making an HTTP POST request to the backend API
    let body = registerData;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': '*',
    });

    return this.http.post<any>(
      this.baseURL + 'CandidateAccount/register',
      body
    );
  }

  loginUser(loginData: any): Observable<any> {
    return this.http.post<any>(this.baseURL + 'Account/login', loginData);
  }
}
