import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  constructor(private http: HttpClient) {}
  sendChangePasswordLink(email: string) {
    return this.http.post<any>(
      environment.baseURL + 'ChangePassword/ChangePasswordEmail' + `/${email}`,
      {}
    );
  }

  changePassword(resetPasswordObj: any) {
    return this.http.post<any>(
      environment.baseURL + 'ChangePassword/ChangePassword',
      resetPasswordObj
    );
  }
}
