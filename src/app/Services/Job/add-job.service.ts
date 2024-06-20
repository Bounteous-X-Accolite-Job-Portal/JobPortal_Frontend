import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../../Models/JobResponse/Job';
import { environment } from '../../../environments/environment.development';
import { JobResponse } from '../../Models/JobResponse/JobResponse';

@Injectable({
  providedIn: 'root',
})
export class AddJobService {
  constructor(private http: HttpClient) {}

  addJobs(jobData: any): Observable<JobResponse> {
    return this.http.post<JobResponse>(environment.baseURL + 'Job/AddJob', jobData);
  }
}
