import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../../Models/ResetPassword';
import { environment } from '../../../environments/environment.development';
import { ResponseModal } from '../../Models/ResponseModal';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  constructor(private http: HttpClient) {}
  
  changePassword(resetPasswordObj: ResetPassword) {
    return this.http.post<ResponseModal>(
      environment.baseURL+'ChangePassword/ChangePassword',
      resetPasswordObj
    );
  }

  sendForgetPasswordLink(email: string) {
    return this.http.post<any>(environment.baseURL +'Email/Email/' + `${email}`, {});
  }
  
  resetPassword(resetPasswordObj: any) {
    return this.http.post<any>(
      environment.baseURL+ `Email/reset-Password`,
      resetPasswordObj
    );
  }
}
