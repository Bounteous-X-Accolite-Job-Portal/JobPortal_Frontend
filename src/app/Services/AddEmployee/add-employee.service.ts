import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AddEmployeeService {
  constructor(private http: HttpClient) {}

  addEmployee(empData: any): Observable<any> {
    return this.http.post<any>(
      environment.baseURL + 'EmployeeAccount/register',empData);
  }
}
