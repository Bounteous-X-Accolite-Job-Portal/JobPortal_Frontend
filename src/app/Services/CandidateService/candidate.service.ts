import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CandidateResponse } from '../../Models/CandidateAccountResponse/CandidateResponse';
import { AllEducationInstitution } from '../../Models/InstitutionResponse/AllEducationInstitution';
import { AllCandidateEducation } from '../../Models/EducationResponse/AllCandidateEducation';
import { candidateEducation } from '../../Models/EducationResponse/candidateEducation';
import { AllDegreeResponse } from '../../Models/DegreeResponse/AllDegreeResponse';
import { DegreeResponse } from '../../Models/DegreeResponse/DegreeRespose';
import { InstitutionResponse } from '../../Models/InstitutionResponse/InstitutionResponse';
import { AllCompanyResponse } from '../../Models/CompanyResponse/AllCompanyResponse';
import { ExperienceOfACandidateResponse } from '../../Models/ExperienceResponse/ExperiencesOfACandidateResponse';
import { candidateEducationResponse } from '../../Models/EducationResponse/candidateEducationResponse';
import { candidateExperienceResponse } from '../../Models/ExperienceResponse/candidateExperienceResponse';
import { AllJobApplicationResponse } from '../../Models/JobApplicationResponse/AllJobApplicationResponse';
import { AllJob } from '../../Models/JobResponse/AllJobs';

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

  addCandidateEducation(education: any)
  {
    return this.http.post<any>(environment.baseURL+'CandidateEducation/addEducation',education);
  };
  
  addCandidateExperience(experience: any)
  {
    return this.http.post<any>(environment.baseURL+'CandidateExperience/addExperience',experience);
  };

  getDegreeById(degreeId?:string):Observable<DegreeResponse>{
    return this.http.get<DegreeResponse>(environment.baseURL+'Degree/getDegree/'+degreeId);
  };

  getInstitutionById(institutionId? : string):Observable<InstitutionResponse>{
      return this.http.get<InstitutionResponse>(environment.baseURL+'EducationInstitution/getInstitution/'+institutionId);
  };

  getAllcandidateExperiences(id1:string):Observable<ExperienceOfACandidateResponse>{
    return this.http.get<ExperienceOfACandidateResponse>(environment.baseURL+'CandidateExperience/getAllExperienceDetails/'+id1);
  };

  deleteEducation(id?:string):Observable<candidateEducationResponse>{
    return this.http.delete<candidateEducationResponse>(environment.baseURL + 'CandidateEducation/removeEducation/' + id);
  };
  
  deleteExperience(id?:string):Observable<candidateExperienceResponse>{
    return this.http.delete<candidateExperienceResponse>(environment.baseURL + 'CandidateExperience/removeExperience/' + id);
  };

  getAllJobApplicationByCandidate(id:string):Observable<AllJobApplicationResponse>{
    return this.http.get<AllJobApplicationResponse>(environment.baseURL+'Application/jobApplication/candidate/'+id);
  };
  
  getAllAppliedJobsByCandidate(id:string):Observable<AllJob>{
    return this.http.get<AllJob>(environment.baseURL+'Application/CandidateAppliedJobs/'+id);
  };

  addInstitution(institution: any ):Observable<any>{
    return this.http.post(environment.baseURL + 'EducationInstitution/addInstitution',institution);
  }

  addCompany(company: any):Observable<any>{
    return this.http.post(environment.baseURL + 'Company/addCompany', company);
  }

  getAllCompanies():Observable<AllCompanyResponse>{
    return this.http.get<AllCompanyResponse>(environment.baseURL+'Company/getAllCompanies');
  }
}
