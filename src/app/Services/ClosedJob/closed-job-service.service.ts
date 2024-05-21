import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ClosedJobResponse } from '../../Models/ClosedJobResponse/ClosedJobResponse';
import { AllClosedJobsResponse } from '../../Models/ClosedJobResponse/AllClosedJobsResponse';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class ClosedJobServiceService {

  constructor(private http: HttpClient) { }

  getClosedJobById(jobId : string): Observable<ClosedJobResponse> {
    return this.http.get<ClosedJobResponse>(
      environment.baseURL + 'Job/getClosedJob/' + jobId
    );
  }

  getAllClosedJobs(): Observable<AllClosedJobsResponse> {
    return this.http.get<AllClosedJobsResponse>(
      environment.baseURL + 'Job/getAllClosedJobs'
    );
  }


  getAllJobsAddedByLoggedInEmployee(employeeId : Guid): Observable<AllClosedJobsResponse> {
    return this.http.get<AllClosedJobsResponse>(
      environment.baseURL + "Job/getAllClosedJobsByEmployee/" + employeeId
    )
  }
}
