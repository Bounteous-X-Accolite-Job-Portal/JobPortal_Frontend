import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationResponse } from '../../Models/ApplicationResponse/ApplicationResponse';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {

  constructor(private http: HttpClient) { }

  getApplicationsById(applicationId : string): Observable<ApplicationResponse> {
    return this.http.get<ApplicationResponse>(
      environment.baseURL + 'Application/jobApplication/' + applicationId
    );
  }

  changeApplicationStatus(applicationId : Guid, statusId : number): Observable<ApplicationResponse> {
    let data = {
      "statusId" : statusId
    }
    
    return this.http.put<ApplicationResponse>(
      environment.baseURL + 'Application/jobApplication/changeStatus/' + applicationId, data
    );
  }
}
