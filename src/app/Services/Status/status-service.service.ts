import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobStatus } from '../../Models/JobStatus';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StatusServiceService {

  constructor(private http:HttpClient) {

   }
   getstatus(statusId:number):Observable<JobStatus>
   {
    return this.http.get<JobStatus>(
      environment.baseURL+'JobStatus/'+statusId
    )
   }
}
