import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { candidateEducation } from '../Models/candidateEducation';
import { Observable } from 'rxjs';
import { AllCandidateEducation } from '../Models/AllCandidateEducation';

@Injectable({
  providedIn: 'root'
})
export class CandidateServicesService {
  apiEndpoint="http://localhost:5234/api/CandidateEducation/"


  //if we inject something, we need to provide it in congif file
  http=inject(HttpClient);
  constructor() { }
  getAllcandidateEducation(id1:string): Observable<AllCandidateEducation>{
    return this.http.get<AllCandidateEducation>(this.apiEndpoint+'getAllEducationDetails/'+id1);
  }

  addEducation(candidateEducationData : candidateEducation): Observable<candidateEducation>{
    return this.http.post<candidateEducation>(this.apiEndpoint+'addcandidateEducation', candidateEducationData );
  }

  // getAllcandidateEducation(){
  //   return this.http.get<candidateEducation[]>(this.apiEndpoint+'f0f253e3-d28d-4d05-9909-a95804d93cea')
  // }
  // getAllcandidateEducation(){
  //   return this.http.get<candidateEducation[]>(this.apiEndpoint+'f0f253e3-d28d-4d05-9909-a95804d93cea')
  // }
}
