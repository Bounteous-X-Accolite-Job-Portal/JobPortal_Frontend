import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from './status';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StatusServiceService {

  constructor(private http:HttpClient) {

   }
   getstatus(statusId:number):Observable<Status>
   {
    return this.http.get<Status>(
      environment.baseURL+'JobStatus/'+statusId
    )
   }
}
