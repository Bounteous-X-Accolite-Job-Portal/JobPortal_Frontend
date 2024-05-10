import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ClosedApplicationResponse } from '../../Models/ClosedApplicationResponse/ClosedApplicationResponse';

@Injectable({
  providedIn: 'root'
})
export class ClosedApplicationService {

  constructor(private http: HttpClient) { }

  getClosedApplicationById(closedApplicationId : string): Observable<ClosedApplicationResponse> {
    return this.http.get<ClosedApplicationResponse>(
      environment.baseURL + 'Application/jobApplication/' + closedApplicationId
    );
  }
}
