import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CandidateResponse } from '../../Models/CandidateAccountResponse/CandidateResponse';

@Injectable({
  providedIn: 'root'
})
export class CandidateServiceService {

  constructor(private http: HttpClient) { }

  getCandidateById(candidateId : string): Observable<CandidateResponse> {
    return this.http.get<CandidateResponse>(
      environment.baseURL + 'CandidateAccount/' + candidateId
    );
  }
}
