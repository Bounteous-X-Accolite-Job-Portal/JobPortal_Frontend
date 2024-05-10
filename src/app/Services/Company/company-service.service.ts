import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CompanyResponse } from '../../Models/CompanyResponse/CompanyResponse';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {

  constructor(private http: HttpClient) { }

  getCompanyById(companyId : string): Observable<CompanyResponse> {
    return this.http.get<CompanyResponse>(
      environment.baseURL + 'Company/getCompany/' + companyId
    );
  }
}
