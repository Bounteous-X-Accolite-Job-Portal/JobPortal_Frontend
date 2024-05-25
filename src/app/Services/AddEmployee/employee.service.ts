import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment.development';
import { Designation } from '../../Models/DesignationResponse/Designation';
import { AllEmployee } from '../../Models/Backend/Employee/AllEmployee';
import { DesignationResponse } from '../../Models/DesignationResponse/DesignationResponse';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  addEmployee(empData: any): Observable<any> {
    return this.http.post<any>(
      environment.baseURL + 'EmployeeAccount/register',
      empData
    );
  }

  getAllEmployee(): Observable<AllEmployee> {
    return this.http.get<AllEmployee>(
      environment.baseURL + 'EmployeeAccount/getAllEmployees'
    );
  }

  getDesignationByDesignationId(
    designationId: number
  ): Observable<DesignationResponse> {
    return this.http.get<DesignationResponse>(
      environment.baseURL + 'Designation/designation/' + designationId
    );
  }

  disableEmployee(employeeId: any): Observable<any>{
    return this.http.put<any>(
      environment.baseURL+'EmployeeAccount/disableAccount/'+ employeeId,
      employeeId
    )
  }

  getAllDesignations(): Observable<DesignationResponse>{
    return this.http.get<DesignationResponse>(
      environment.baseURL+ 'Designation/getAllDesignations'
    )
  }
}
