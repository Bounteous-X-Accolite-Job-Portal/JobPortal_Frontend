import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'https://localhost:44372/api';

  constructor(private http: HttpClient) {}

  // register(registerUser:Array<String>) {
  //   this.http.post(this.baseURL + 'Account/register',
  //     {
  //       firstName = registerUser[0],
  //       lastName = registerUser[1],

  //     },
  //   );
  // }

  login(email: any, password: any) {
    return this.http.get(this.baseURL + 'login');
  }
}
