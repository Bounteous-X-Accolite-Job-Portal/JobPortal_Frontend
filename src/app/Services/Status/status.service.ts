import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AllStatusResponse } from '../../Models/StatusResponse/AllStatusResponse';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  getAllStatus() : Observable<AllStatusResponse> {
    return this.http.get<AllStatusResponse>(environment.baseURL + 'JobStatus/getAllStatus');
  }
}
