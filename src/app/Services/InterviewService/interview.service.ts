import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApplicantInterviewResponse } from '../../Models/InterviewResponse/ApplicantInterviewResponse';
import { Guid } from 'guid-typescript';
import { AddInterviewResponse } from '../../Models/InterviewResponse/AddInterviewResponse';

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
  
  addInterview(data : any) : Observable<AddInterviewResponse> {
    return this.http.post<AddInterviewResponse>(
      environment.baseURL + 'Interview/AddInterview', data 
    );
  } 
}
