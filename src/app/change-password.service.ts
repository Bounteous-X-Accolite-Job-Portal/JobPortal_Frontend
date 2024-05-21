import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resertPassword } from './Models/resetPasswordmodel';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
 
  
  apiEndPoint="http://localhost:5234/api/ChangePassword/ChangePasswordEmail"

  constructor(private http:HttpClient) { }
  sendChangePasswordLink(email:string)
  {
    return this.http.post<any>(`${this.apiEndPoint}/${email}`,{})
  }


  changePassword(resertPasswordObj:resertPassword)
  {
    //console.log(this.changePassword);
    return this.http.post<any>(`${this.apiEndPoint}`,resertPasswordObj);
  }
}