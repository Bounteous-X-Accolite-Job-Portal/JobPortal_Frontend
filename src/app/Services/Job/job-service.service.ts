import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { JobResponse } from '../../Models/JobResponse/JobResponse';

@Injectable({
  providedIn: 'root'
})
export class JobServiceService {

  constructor(private http: HttpClient) { }

  getJobById(jobId : string): Observable<JobResponse> {
    return this.http.get<JobResponse>(
      environment.baseURL + 'Job/getJob/' + jobId
    );
  }
}
