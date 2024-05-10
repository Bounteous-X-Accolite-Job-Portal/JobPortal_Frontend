import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { SkillsResponse } from '../../Models/SkillsResponse/SkillsResponse';

@Injectable({
  providedIn: 'root'
})
export class SkillsServiceService {

  constructor(private http: HttpClient) { }

  getSkillsByCandidateId(candidateId : string) : Observable<SkillsResponse> {
    return this.http.get<SkillsResponse>(environment.baseURL + 'Skills/getSkills/' + candidateId);
  }
}
