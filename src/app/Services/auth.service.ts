import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailValidator } from '@angular/forms';

import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'http://localhost:5234/api/';

  constructor(private http: HttpClient) {}

  // registerUser(registerData: any) {
  //   const data = {
  //     firstName: registerData[0],
  //     lastName: registerData[1],
  //     email: registerData[2],
  //     password: registerData[3],
  //   };

  //   return axios.post(
  //     'http://localhost:5234/api/Account/register',
  //     {
  //       data,
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'User-Agent': 'http://localhost:4200/',
  //       },
  //     }
  //   );
  // }

  register(registerUser: Array<String>) {
    // Implement your registration logic here
    // For example:
    // return this.http.post<any>(this.baseURL + 'Account/register', registerUser);
    this.http.post(
      this.baseURL + 'Account/register',
      {
        firstName: registerUser[0],
        lastName: registerUser[1],
        email: registerUser[2],
        password: registerUser[3],
        confirmPassword: registerUser[4],
      },
      {
        responseType: 'text',
        // firstName = registerUser[0],
        // lastName = registerUser[1],
      }
    );
  }
  login(email: any, password: any) {
    return this.http.get(this.baseURL + 'login');
  }

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
      'http://localhost:5234/api/Account/register',
      body
    );
  }
}
