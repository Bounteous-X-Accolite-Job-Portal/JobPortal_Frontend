import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetInterviewsService {

  constructor(private http: HttpClient) { }

  getAllInterviewsOfLoggedInEmployee(): Observable<any> {
    return this.http.get<any>(
      environment.baseURL + 'Interview/GetAllInterviewsForInterviewer'
    );
  }
}
