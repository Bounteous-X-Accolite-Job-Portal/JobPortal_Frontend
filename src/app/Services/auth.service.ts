import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiEndpoint: string = "URL";

  constructor(private http: HttpClient) { }

  registerCandidate(obj: any){
    return this.http.post(this.apiEndpoint+'AddCandidate', obj)
  }
}
