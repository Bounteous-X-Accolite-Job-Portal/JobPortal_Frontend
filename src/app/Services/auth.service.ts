import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailValidator } from '@angular/forms';

import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'https://localhost:7283/api/';

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
      this.baseURL+ 'CandidateAccount/register',
      body
    );
  }

  loginUser(loginData: any): Observable<any> {
    return this.http.post<any>(this.baseURL + 'Account/login', loginData);
  }
}
