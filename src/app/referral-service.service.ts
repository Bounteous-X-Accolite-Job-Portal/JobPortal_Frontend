import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Referral } from './referral';

@Injectable({
  providedIn: 'root'
})
export class ReferralServiceService {
  

  constructor(private http:HttpClient) { }

  private baseUrl="https://localhost:7283/api/Referral/refer";

  referral(referralObj:Referral)
  {
    return this.http.post<any>(this.baseUrl,referralObj);
  }
}
