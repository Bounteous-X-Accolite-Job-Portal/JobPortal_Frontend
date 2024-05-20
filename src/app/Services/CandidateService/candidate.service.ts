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
import { SocialMedia } from '../../Models/SocialMediaResponse/SocialMedia';
import { SocailMediaResponse } from '../../Models/SocialMediaResponse/SocialMediaResponse';
import { SkillsResponse } from '../../Models/SkillsResponse/SkillsResponse';
import { Skills } from '../../Models/SkillsResponse/Skills';
import { candidateExperience } from '../../Models/ExperienceResponse/candidateExperience';

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

  addSocialMedia(socialMedia?:any | undefined){
    return this.http.post<any>(environment.baseURL+'SocialMedia/addSocialMediaDetails',socialMedia)
  };

  getSocialMediaDetails(id:string):Observable<SocailMediaResponse>{
    return this.http.get<SocailMediaResponse>(environment.baseURL+'SocialMedia/getSocialMediaDetails/'+id);
  };

  updateSocialMedia(socialMedia?:any | undefined){
    return this.http.put<any>(environment.baseURL+'SocialMedia/updateSocialMediaDetails',socialMedia);
  };

  getSkillsOfCandidate(id:string):Observable<SkillsResponse>{
    return this.http.get<SkillsResponse>(environment.baseURL+'Skills/getSkills/'+id);
  }

  addSkilsOfCandidate(userskills:string){
    return this.http.post<string>(environment.baseURL+'Skills/addSkills/',{"candidateSkills":userskills});
  }

  updateSkillsOfCandidate(userskills:Skills){
    return this.http.put<Skills>(environment.baseURL+'Skills/updateSkills',userskills);
  }

  getCandidateEducation(educationId:string):Observable<candidateEducationResponse>{
    return this.http.get<candidateEducationResponse>(environment.baseURL+'CandidateEducation/getDetails/'+educationId);
  }
  
  updateCandiateEducation(education:candidateEducation){
    return this.http.put<candidateEducation>(environment.baseURL+'CandidateEducation/updateEducation',education);
  }

  getCandidateExperience(experienceId:string):Observable<candidateExperienceResponse>{
    return this.http.get<candidateExperienceResponse>(environment.baseURL+'CandidateExperience/getExperience/'+experienceId);
  }

  updateCandidateExperience(experience:candidateExperience){
    return this.http.put<candidateExperience>(environment.baseURL+'CandidateExperience/updateExperience',experience);
  }
}
