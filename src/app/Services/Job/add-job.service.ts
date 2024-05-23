import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../../Models/JobResponse/Job';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AddJobService {
  constructor(private http: HttpClient) {}

  addJobs(jobData: any): Observable<Job> {
    return this.http.post<Job>(environment.baseURL + 'Job/AddJob', jobData);
  }
}
