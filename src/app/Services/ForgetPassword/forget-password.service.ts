import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../../Models/ResetPassword';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ForgetPasswordService {
  // apiEndpoint = 'https://localhost:7283/api/Email';

  constructor(private http: HttpClient) {}
  sendForgetPasswordLink(email: string) {
    return this.http.post<any>(environment.baseURL+"Email/Email/"+`${email}`, {});
  }
  resertPassword(resertPasswordObj: ResetPassword) {
    console.log(this.resertPassword);
    return this.http.post<any>(
      environment.baseURL+`Email/reset-Password`,
      resertPasswordObj
    );
  }
}
