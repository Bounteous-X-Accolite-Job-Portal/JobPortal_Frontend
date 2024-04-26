import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}
 
  login(email: any, password: any) {
    return this.http.post(`${this.baseURL}/login`, { email, password });
  }
}
