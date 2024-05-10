import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResumeResponse } from '../../Models/ResumeResponse/ResumeResponse';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ResumeServiceService {

  constructor(private http: HttpClient) { }

  getResumeByCandidateId(candidateId : string) : Observable<ResumeResponse> {
    return this.http.get<ResumeResponse>(environment.baseURL + 'Resume/getResume/' + candidateId);
  }
}
