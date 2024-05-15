import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ExperienceOfACandidateResponse } from '../../Models/ExperienceResponse/ExperiencesOfACandidateResponse';

@Injectable({
  providedIn: 'root'
})
export class ExperienceServiceService {

  constructor(private http: HttpClient) { }

  getExperienceByCandidateId(candidateId : string) : Observable<ExperienceOfACandidateResponse> {
    return this.http.get<ExperienceOfACandidateResponse>(environment.baseURL + 'CandidateExperience/getAllExperienceDetails/' + candidateId);
  }
}
