import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment.development';
import { Designation } from '../../Models/DesignationResponse/Designation';
import { AllEmployee } from '../../Models/Backend/Employee/AllEmployee';
import { DesignationResponse } from '../../Models/DesignationResponse/DesignationResponse';
import { EmployeeResponse } from '../../Models/Backend/Employee/EmployeeResponse';
import { EmployeeProfileData } from '../../Models/Backend/Employee/EmployeeProfileData';
import { AddEmployee } from '../../Models/Backend/Employee/AddEmployee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  addEmployee(empData: AddEmployee): Observable<any> {
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

  getEmployeeById(employeeId : string): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(
      environment.baseURL + 'EmployeeAccount/employee/' + employeeId
    );
  }

  getEmployeeProfileData(employeeId : string): Observable<EmployeeProfileData> {
    return this.http.get<EmployeeProfileData>(
      environment.baseURL + 'EmployeeAccount/profileData/' + employeeId
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
