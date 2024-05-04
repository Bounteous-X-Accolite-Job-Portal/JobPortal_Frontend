import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieServiceService } from '../cookie-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'https://localhost:7283/api/';

  constructor(
    private http: HttpClient,
    private cookieService: CookieServiceService
  ) {}

  registerUser(registerData: any): Observable<any> {
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
    // return this.http.post<any>(this.baseURL +'CandidateAccount/register', registerData);
  }

  loginUser(loginData: any): Observable<any> {
    return this.http.post<any>(this.baseURL + 'Account/login', loginData);
  }

  getResumes(id: any): Observable<any> {
    return this.http.get(this.baseURL + 'Resume/resume/' + id);
  }

  storeToken(tokenValue: string) {
    this.cookieService.set('Token', tokenValue);
    //localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return this.cookieService.get('Token');
    //return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.cookieService.get('Token');
    //return !!localStorage.getItem('token');
  }
}
