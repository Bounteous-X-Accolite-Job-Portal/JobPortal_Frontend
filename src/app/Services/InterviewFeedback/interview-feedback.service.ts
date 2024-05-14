import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { InterviewFeedback } from '../../Models/InterviewFeedback';
import { AddInterviewFeedbackResponse } from '../../Models/InterviewFeedback/AddInterviewFeedbackResponse';

@Injectable({
  providedIn: 'root'
})
export class InterviewFeedbackService {

  constructor(private http: HttpClient) { }

  addFeedback(feedbackData : InterviewFeedback) : Observable<AddInterviewFeedbackResponse> {
    return this.http.post<AddInterviewFeedbackResponse>(environment.baseURL + 'InterviewFeedback/AddInterviewFeedback', feedbackData);
  }
}
