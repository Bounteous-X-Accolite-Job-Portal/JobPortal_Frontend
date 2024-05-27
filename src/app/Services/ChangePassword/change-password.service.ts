import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../../Models/ResetPassword';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  apiEndPoint = 'https://localhost:7283/api/';

  constructor(private http: HttpClient) {}
  sendChangePasswordLink(email: string) {
    return this.http.post<any>(`${this.apiEndPoint}/${email}`, {});
  }

  changePassword(resertPasswordObj: ResetPassword) {
    return this.http.post<ResetPassword>(
      environment.baseURL+'ChangePassword/ChangePassword',
      resertPasswordObj
    );
  }
}
