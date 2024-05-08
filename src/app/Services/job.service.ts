import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllJobLocations } from '../Models/JoblocationResponse/AllJobLocations';
import { AllJobTypes } from '../Models/JobTypeResponse/AllJobType';
import { AllJobCategory } from '../Models/JobCategoryResponse/AllJobCategory';
import { AllJobPosition } from '../Models/JobPositionResponse/AllJobPosition';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {}

  getAllJobLocations(): Observable<AllJobLocations> {
    return this.http.get<AllJobLocations>(
      environment.baseURL + 'JobLocation/getAllJobLocations'
    );
  }

  getAllJobTypes(): Observable<AllJobTypes> {
    return this.http.get<AllJobTypes>(
      environment.baseURL + 'JobType/getAllJobTypes'
    );
  }

  getAllJobCategories(): Observable<AllJobCategory> {
    return this.http.get<AllJobCategory>(
      environment.baseURL + 'JobCategory/getAllJobCategory'
    );
  }

  getAllJobPosition(): Observable<AllJobPosition> {
    return this.http.get<AllJobPosition>(
      environment.baseURL + 'JobPosition/getAllJobPositions'
    );
  }
}
