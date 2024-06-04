import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Referral } from '../../Models/ReferralResponse/referral';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { GetReferral } from '../../Models/ReferralResponse/get-referral';
import { AddReferralResponse } from '../../Models/ReferralResponse/add-referral-response';

@Injectable({
  providedIn: 'root'
})
export class ReferralServiceService {
  

  constructor(private http:HttpClient) { }

  addreferral(referralObj:Referral): Observable<AddReferralResponse>
  {
    return this.http.post<AddReferralResponse>(environment.baseURL+'Referral/refer',referralObj);
  }

  getreferral(empId:string ):Observable<GetReferral>
  {
    return this.http.get<GetReferral>(
      environment.baseURL + 'Referral/getAllReferrals/'
    );
  }

}
