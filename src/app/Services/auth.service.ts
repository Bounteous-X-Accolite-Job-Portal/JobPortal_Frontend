import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailValidator } from '@angular/forms';

import { Login } from '../Models/loginUser';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private baseURL = 'http://localhost:5234/api/';

  constructor(
    private http: HttpClient,

  ) {}

  registerUser(registerData: any): Observable<any> {
    // Assuming you are making an HTTP POST request to the backend API
    return this.http.post<any>(this.baseURL +'CandidateAccount/register', registerData);
  }

  loginUser(loginData: any): Observable<any> {
    return this.http.post<Login>(this.baseURL + 'Account/login', loginData);
  }

  getResumes(id: any): Observable<any>{
    return this.http.get(this.baseURL + "Resume/resume/" + id);
  }

  // storeToken(tokenValue: string){
  //   localStorage.setItem('token', tokenValue);
  // }

  // getToken(){
  //   return localStorage.getItem('token');
  // }

  // isLoggedIn(): boolean{
  //   return !!localStorage.getItem('token');
  // }
}
