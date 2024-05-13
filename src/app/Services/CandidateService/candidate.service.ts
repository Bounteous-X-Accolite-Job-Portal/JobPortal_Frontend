import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CandidateResponse } from '../../Models/CandidateAccountResponse/CandidateResponse';
import { AllEducationInstitution } from '../../Models/InstitutionResponse/AllEducationInstitution';
import { AllCandidateEducation } from '../../Models/EducationResponse/AllCandidateEducation';
import { candidateEducation } from '../../Models/EducationResponse/candidateEducation';
import { AllDegreeResponse } from '../../Models/DegreeResponse/AllDegreeResponse';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  getCandidateById(candidateId : string): Observable<CandidateResponse> {
    return this.http.get<CandidateResponse>(
      environment.baseURL + 'CandidateAccount/' + candidateId );
  }

  getAllInstitutions():Observable<AllEducationInstitution>{
    return this.http.get<AllEducationInstitution>(
      environment.baseURL +'EducationInstitution/getAllInstitution');
  }

  getAllcandidateEducation(id1:string): Observable<AllCandidateEducation>{
    return this.http.get<AllCandidateEducation>(environment.baseURL+'CandidateEducation/getAllEducationDetails/'+id1);
  }

  addEducation(candidateEducationData : candidateEducation): Observable<candidateEducation>{
    return this.http.post<candidateEducation>(environment.baseURL+'CandidateEducation/addcandidateEducation', candidateEducationData );
  }

  getAllDegrees():Observable<AllDegreeResponse>{
    return this.http.get<AllDegreeResponse>(environment.baseURL+'Degree/getAllDegrees');
  };
}
