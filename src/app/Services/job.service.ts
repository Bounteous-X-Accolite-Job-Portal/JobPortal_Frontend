import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllJobLocations } from '../Models/JoblocationResponse/AllJobLocations';
import { AllJobTypes } from '../Models/JobTypeResponse/AllJobType';
import { AllJobCategory } from '../Models/JobCategoryResponse/AllJobCategory';
import { AllJobPosition } from '../Models/JobPositionResponse/AllJobPosition';
import { AllJob } from '../Models/JobResponse/AllJobs';
import { Job } from '../Models/JobResponse/Job';
import { Guid } from 'guid-typescript';
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

    getJobById(Id:string):Observable<Job>{
      return this.http.get<Job>(this.baseURL+'Job/getJob/'+Id);
    }
  }