import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllJobLocations } from '../Models/JoblocationResponse/AllJobLocations';
import { AllJobTypes } from '../Models/JobTypeResponse/AllJobType';
import { AllJobCategory } from '../Models/JobCategoryResponse/AllJobCategory';
import { AllJobPosition } from '../Models/JobPositionResponse/AllJobPosition';
import { AllJob } from '../Models/JobResponse/AllJobs';
import { JobResponse } from '../Models/JobResponse/JobResponse';
import { DegreeResponse } from '../Models/DegreeResponse/DegreeRespose';
import { JobCategoryResponse } from '../Models/JobCategoryResponse/JobCategoryResponse';
import { JobTypeResponse } from '../Models/JobTypeResponse/JobTypeResponse';
import { JobLocationResponse } from '../Models/JoblocationResponse/JobLocationResponse';
import { JobPositionResponse } from '../Models/JobPositionResponse/JobPositionResponse';
import { JobApplication } from '../Models/JobApplicationResponse/JobApplication';
import { AllDegreeResponse } from '../Models/DegreeResponse/AllDegreeResponse';
import { ApplicationResponse } from '../Models/JobApplicationResponse/ApplicationResponse';
@Injectable({
    providedIn: 'root',
  })

  export class JobService
  {
    private baseURL = 'https://localhost:7283/api/';

    constructor(private http: HttpClient) {}

    getAllJobs():Observable<AllJob>{
      return this.http.get<AllJob>(this.baseURL+'Job/getAllJobs');
    };

    getAllJobLocations():Observable<AllJobLocations> {
      return this.http.get<AllJobLocations>(this.baseURL+'JobLocation/getAllJobLocations');
    };

    getAllJobTypes():Observable<AllJobTypes> {
      return this.http.get<AllJobTypes>(this.baseURL+'JobType/getAllJobTypes');
    };
    
    getAllJobCategories():Observable<AllJobCategory> {
      return this.http.get<AllJobCategory>(this.baseURL+'JobCategory/getAllJobCategory');
    };

    getAllJobPosition():Observable<AllJobPosition>{
      return this.http.get<AllJobPosition>(this.baseURL+'JobPosition/getAllJobPositions');
    };
    
    getAllDegrees():Observable<AllDegreeResponse>{
      return this.http.get<AllDegreeResponse>(this.baseURL+'Degree/getAllDegrees');
    };

    getJobById(Id:string):Observable<JobResponse>{
      return this.http.get<JobResponse>(this.baseURL+'Job/getJob/'+Id);
    };
    
    getLocationById(locationId?:string):Observable<JobLocationResponse>{
      return this.http.get<JobLocationResponse>(this.baseURL+'JobLocation/getJobLocation/'+locationId);
    };

    getJobTypeById(JobTypeId?:string):Observable<JobTypeResponse>{
      return this.http.get<JobTypeResponse>(this.baseURL+'JobType/getJobType/'+JobTypeId);
    };

    getDegreeById(degreeId?:string):Observable<DegreeResponse>{
      return this.http.get<DegreeResponse>(this.baseURL+'Degree/getDegree/'+degreeId);
    };

    getPositionById(positionId?:string):Observable<JobPositionResponse>{
      return this.http.get<JobPositionResponse>(this.baseURL+'JobPosition/getJobPosition/'+positionId);
    };

    getCategoryById(Id?:string):Observable<JobCategoryResponse>{
      return this.http.get<JobCategoryResponse>(this.baseURL+'JobCategory/getJobCategory/'+Id);
    };

    applyForJob(jobId?: any):Observable<any>{
      return this.http.post<any>(this.baseURL+'Application/apply',{
        "jobId":jobId
      });
    };

    checkCandidateApplicable(jobId?:string):Observable<ApplicationResponse>{
        return this.http.get<ApplicationResponse>(this.baseURL+'Application/jobApplication/isCandidateApplicable/'+jobId);
    }
  }