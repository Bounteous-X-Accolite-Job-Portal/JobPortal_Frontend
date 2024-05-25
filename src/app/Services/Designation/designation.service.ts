import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AllDesignationResponse } from '../../Models/DesignationResponse/AllDesignationResponse';
import { DesignationResponse } from '../../Models/DesignationResponse/DesignationResponse';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(private http: HttpClient) { }

  getAllDesignations() : Observable<AllDesignationResponse> {
    return this.http.get<AllDesignationResponse>(environment.baseURL + 'Designation/getAllDesignations');
  }

  getDesignationById(designationId : number) : Observable<DesignationResponse> {
    return this.http.get<DesignationResponse>(environment.baseURL + 'Designation/designation/' + designationId);
  }

  addDesignation(newDesignation : string) : Observable<DesignationResponse>{
    let data = {
      designationName: newDesignation
    }

    return this.http.post<DesignationResponse>(environment.baseURL + "Designation/addDesignation", data)
  }

  deleteDesignation(designationId : number) : Observable<DesignationResponse>{
    return this.http.delete<DesignationResponse>(environment.baseURL + "Designation/removeDesignation/" + designationId);
  }
}
