import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Education } from '../Models/candidateEducation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateServicesService {
  apiEndpoint="http://localhost:5234/api/CandidateEducation/"


  //if we inject something, we need to provide it in congif file
  http=inject(HttpClient);
  constructor() { }
  getAllEducation(){
    return this.http.get<Education[]>(this.apiEndpoint+'getAllEducationDetails/f0f253e3-d28d-4d05-9909-a95804d93cea')
  }
  addEducation(EducationData : Education): Observable<Education>{
    return this.http.post<Education>(this.apiEndpoint+'addEducation', EducationData );
  }

  // getAllEducation(){
  //   return this.http.get<Education[]>(this.apiEndpoint+'f0f253e3-d28d-4d05-9909-a95804d93cea')
  // }
  // getAllEducation(){
  //   return this.http.get<Education[]>(this.apiEndpoint+'f0f253e3-d28d-4d05-9909-a95804d93cea')
  // }
}
