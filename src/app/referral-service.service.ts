import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Referral } from './referral';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Employee } from './Models/Backend/Employee/Employee';
import { EmployeeDashboardComponent } from './Components/Employee/employee-dashboard/employee-dashboard.component';
import { Referralresponse } from './referralresponse';
import { GetReferral } from './get-referral';

@Injectable({
  providedIn: 'root'
})
export class ReferralServiceService {
  

  constructor(private http:HttpClient) { }

  addreferral(referralObj:Referral): Observable<Referral>
  {
    return this.http.post<any>(environment.baseURL+'Referral/refer',referralObj);
  }

  getreferral(empId:string ):Observable<GetReferral>
  {
    return this.http.get<GetReferral>(
      environment.baseURL + 'Referral/getAllReferrals'
    );
  }

}
