import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { AllInterviewsResponse } from '../../Models/InterviewResponse/AllInterviewsResponse';

@Injectable({
  providedIn: 'root'
})
export class GetInterviewsService {

  constructor(private http: HttpClient) { }

  getAllInterviewsOfLoggedInEmployee(): Observable<AllInterviewsResponse> {
    return this.http.get<AllInterviewsResponse>(
      environment.baseURL + 'Interview/GetAllInterviewsForInterviewer/'
    );
  }
}
