import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResumeResponse } from '../../Models/ResumeResponse/ResumeResponse';
import { environment } from '../../../environments/environment.development';
import { Resume } from '../../Models/ResumeResponse/Resume';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class ResumeServiceService {

  constructor(private http: HttpClient) { }

  getResumeByCandidateId(candidateId : string) : Observable<ResumeResponse> {
    return this.http.get<ResumeResponse>(environment.baseURL + 'Resume/getResume/' + candidateId);
  }


  addResumeByCandidateId(resumeLink: string) : Observable<ResumeResponse> {
    return this.http.post<ResumeResponse>(environment.baseURL+'Resume/addResume',{"resumeUrl":resumeLink});
  }

  updateResumeByCandidateId(resume: Resume) : Observable<ResumeResponse> {
    return this.http.put<ResumeResponse>(environment.baseURL + 'Resume/updateResume', resume);
  }

  removeResumeByResumeId(resumeId?: string) : Observable <ResumeResponse> {
    return this.http.delete<ResumeResponse>(environment.baseURL + 'Resume/removeResume/' + resumeId);
  }
}
