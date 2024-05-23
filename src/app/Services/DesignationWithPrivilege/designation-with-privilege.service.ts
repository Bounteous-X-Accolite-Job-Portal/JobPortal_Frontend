import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AllDesignationWithPrivilegeResponse } from '../../Models/DesignationWithPrivilegeResponse/AllDesignationWithPrivilegeResponse';
import { Guid } from 'guid-typescript';
import { DesignationWithPrivilegeResponse } from '../../Models/DesignationWithPrivilegeResponse/DesignationWithPrivilegeResponse';

@Injectable({
  providedIn: 'root'
})
export class DesignationWithPrivilegeService {

  constructor(private http: HttpClient) { }

  getAllDesignationWithPrivilege() : Observable<AllDesignationWithPrivilegeResponse> {
    return this.http.get<AllDesignationWithPrivilegeResponse>(environment.baseURL + 'DesignationWithPrivilege/getAllPrivileges');
  }

  getPrivilegeByDesignationId(designationId: number) : Observable<DesignationWithPrivilegeResponse>{
    return this.http.get<DesignationWithPrivilegeResponse>(environment.baseURL + "DesignationWithPrivilege/getPrivilege/designation/" + designationId);
  }

  addPrivilege(designationId: number) : Observable<DesignationWithPrivilegeResponse>{
    let data = {
      designationId : designationId
    }

    return this.http.post<DesignationWithPrivilegeResponse>(environment.baseURL + "DesignationWithPrivilege/addPrivilege", data);
  }

  removePrivilege(privilegeId : number) : Observable<DesignationWithPrivilegeResponse>{
    return this.http.delete<DesignationWithPrivilegeResponse>(environment.baseURL + "DesignationWithPrivilege/removePrivilege/" + privilegeId);
  }
}
