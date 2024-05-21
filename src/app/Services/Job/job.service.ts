import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllJobLocations } from '../../Models/JoblocationResponse/AllJobLocations';
import { AllJobTypes } from '../../Models/JobTypeResponse/AllJobType';
import { AllJobCategory } from '../../Models/JobCategoryResponse/AllJobCategory';
import { AllJobPosition } from '../../Models/JobPositionResponse/AllJobPosition';
import { environment } from '../../../environments/environment.development';

import { AllJob } from '../../Models/JobResponse/AllJobs';
import { JobResponse } from '../../Models/JobResponse/JobResponse';
import { DegreeResponse } from '../../Models/DegreeResponse/DegreeRespose';
import { JobCategoryResponse } from '../../Models/JobCategoryResponse/JobCategoryResponse';
import { JobTypeResponse } from '../../Models/JobTypeResponse/JobTypeResponse';
import { JobLocationResponse } from '../../Models/JoblocationResponse/JobLocationResponse';
import { JobPositionResponse } from '../../Models/JobPositionResponse/JobPositionResponse';
import { JobApplication } from '../../Models/JobApplicationResponse/JobApplication';
import { AllDegreeResponse } from '../../Models/DegreeResponse/AllDegreeResponse';
import { ApplicationResponse } from '../../Models/JobApplicationResponse/ApplicationResponse';
import { Job } from '../../Models/JobResponse/Job';
@Injectable({
  providedIn: 'root',
})
export class JobService {
  public jobId!:string;
  constructor(private http: HttpClient) {}

    getAllJobs():Observable<AllJob>{
      return this.http.get<AllJob>(environment.baseURL+'Job/getAllJobs');
    };

    getAllJobLocations():Observable<AllJobLocations> {
      return this.http.get<AllJobLocations>(environment.baseURL+'JobLocation/getAllJobLocations');
    };

    getAllJobTypes():Observable<AllJobTypes> {
      return this.http.get<AllJobTypes>(environment.baseURL+'JobType/getAllJobTypes');
    };
    
    getAllJobCategories():Observable<AllJobCategory> {
      return this.http.get<AllJobCategory>(environment.baseURL+'JobCategory/getAllJobCategory');
    };

    getAllJobPosition():Observable<AllJobPosition>{
      return this.http.get<AllJobPosition>(environment.baseURL+'JobPosition/getAllJobPositions');
    };

    getAllDegrees():Observable<AllDegreeResponse>{
      return this.http.get<AllDegreeResponse>(environment.baseURL+'Degree/getAllDegrees');
    };
    
    getJobById(Id:string):Observable<JobResponse>{
      return this.http.get<JobResponse>(environment.baseURL+'Job/getJob/'+Id);
    };
    
    getLocationById(locationId?:string):Observable<JobLocationResponse>{
      return this.http.get<JobLocationResponse>(environment.baseURL+'JobLocation/getJobLocation/'+locationId);
    };

    getJobTypeById(JobTypeId?:string):Observable<JobTypeResponse>{
      return this.http.get<JobTypeResponse>(environment.baseURL+'JobType/getJobType/'+JobTypeId);
    };

    getDegreeById(degreeId?:string):Observable<DegreeResponse>{
      return this.http.get<DegreeResponse>(environment.baseURL+'Degree/getDegree/'+degreeId);
    };

    getPositionById(positionId?:string):Observable<JobPositionResponse>{
      return this.http.get<JobPositionResponse>(environment.baseURL+'JobPosition/getJobPosition/'+positionId);
    };

    getCategoryById(Id?:string):Observable<JobCategoryResponse>{
      return this.http.get<JobCategoryResponse>(environment.baseURL+'JobCategory/getJobCategory/'+Id);
    };

    applyForJob(jobId?: any):Observable<any>{
      return this.http.post<any>(environment.baseURL+'Application/apply',{
        "jobId":jobId
      });
    };

    checkCandidateApplicable(jobId?:string):Observable<ApplicationResponse>{
        return this.http.get<ApplicationResponse>(environment.baseURL+'Application/jobApplication/isCandidateApplicable/'+jobId);
    };

    updateJob(job:Job):Observable<JobResponse>{
      return this.http.put<JobResponse>(environment.baseURL+'Job/UpdateJob',job);
    }
  }
