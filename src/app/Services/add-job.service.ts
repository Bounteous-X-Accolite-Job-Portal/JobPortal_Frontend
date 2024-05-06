import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../Models/Job';

@Injectable({
  providedIn: 'root',
})
export class AddJobService {
  private baseURL = 'https://localhost:7283/api/';

  constructor(private http: HttpClient) {}

  addJobs(jobData: any): Observable<any> {
    return this.http.post<any>(this.baseURL + 'Job/AddJob', jobData);
  }
}
