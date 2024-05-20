import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment.development';
import { Guid } from 'guid-typescript';
import { ApplicantResponse } from '../../Models/ApplicantsResponse/ApplicantResponse';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(private http: HttpClient) {}

  getApplicantsByJobId(jobId: string): Observable<ApplicantResponse> {
    return this.http.get<ApplicantResponse>(environment.baseURL + 'Application/applicants/' + jobId);
  }
}
