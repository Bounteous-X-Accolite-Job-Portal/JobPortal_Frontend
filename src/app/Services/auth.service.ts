import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiEndpoint: string = "http://localhost:5234/api/";

  constructor(private http: HttpClient) { }

  registerCandidate(obj: any){
    return this.http.post(this.apiEndpoint+'CandidateAccount/register', obj)
  }
}
