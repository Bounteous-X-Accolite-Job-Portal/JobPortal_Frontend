import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { StatusResponse } from '../../Models/StatusResponse/StatusResponse';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  getAllStatus() : Observable<StatusResponse> {
    return this.http.get<StatusResponse>(environment.baseURL + 'JobStatus/getAllStatus');
  }
}
