import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AddEmployeeService {

  private baseURL = 'http://localhost:5234/api/';

  constructor(private http: HttpClient) {}

  addEmployee(empData : {
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string;
    EmpId: string;
    Designation: number;
  }): Observable<any> {
    return this.http.post<any>(
      this.baseURL + 'EmployeeAccount/register',
      empData
    );
  }

}
