import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApplicantInterviewResponse } from '../../Models/InterviewResponse/ApplicantInterviewResponse';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(private http: HttpClient) { }

  getAllApplicantInterviewsByApplicationId(applicationId : Guid): Observable<ApplicantInterviewResponse> {
    return this.http.get<ApplicantInterviewResponse>(
      environment.baseURL + 'Interview/getAllApplicantInterviewsByApplicationId/' + applicationId 
    );
  }
}
