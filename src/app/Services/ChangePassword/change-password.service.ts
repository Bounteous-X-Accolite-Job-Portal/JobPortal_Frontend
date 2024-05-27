import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../../Models/ResetPassword';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  apiEndPoint = 'http://localhost:7283/api/ChangePassword/ChangePasswordEmail';

  constructor(private http: HttpClient) {}
  sendChangePasswordLink(email: string) {
    return this.http.post<any>(`${this.apiEndPoint}/${email}`, {});
  }

  changePassword(resertPasswordObj: any) {
    //console.log(this.changePassword);
    return this.http.post<any>(
      'http://localhost:7283/api/ChangePassword/ChangePassword',
      resertPasswordObj
    );
  }
}
