import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment.development';
import { Designation } from '../../Models/DesignationResponse/Designation';
import { AllEmployee } from '../../Models/Backend/Employee/AllEmployee';

@Injectable({
  providedIn: 'root',
})
export class AddEmployeeService {
  constructor(private http: HttpClient) {}

  addEmployee(empData: any): Observable<any> {
    return this.http.post<any>(
      environment.baseURL + 'EmployeeAccount/register',empData);
  }

  getAllEmployee(): Observable<AllEmployee> {
    return this.http.get<AllEmployee>(
      environment.baseURL + 'EmployeeAccount/getAllEmployees'
    );
  }

  // getAllDesignation(): Observable<Designation>{
  //   return this.http.get<>(
  //     environment.baseURL.
  //   )
  // }
}
