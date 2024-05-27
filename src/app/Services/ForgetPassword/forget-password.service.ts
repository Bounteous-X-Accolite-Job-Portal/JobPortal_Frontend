import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resertPassword } from '../../Models/resetPasswordmodel';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  apiEndpoint="https://localhost:7283/api/Email"

  constructor(private http:HttpClient) { }
  sendForgetPasswordLink(email:string)
  {
    return this.http.post<any>(`${this.apiEndpoint}/Email/${email}`,{})
  }
  resertPassword(resertPasswordObj:resertPassword)
  {
    console.log(this.resertPassword);
    return this.http.post<any>(`${this.apiEndpoint}/reset-Password`,resertPasswordObj);
  }
}
