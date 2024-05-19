import { Component, OnInit } from '@angular/core';
import { Referralresponse } from '../referralresponse';
import { ReferralServiceService } from '../referral-service.service';

@Component({
  selector: 'app-get-referral',
  standalone: true,
  imports: [],
  templateUrl: './get-referral.component.html',
  styleUrl: './get-referral.component.css'
})
export class GetReferralComponent implements OnInit {
  empId:string='';
  constructor(
    private referalService:ReferralServiceService
  ){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  referrals:Referralresponse[]=[];

private getreferals():void{
  this.referalService.getreferral(this.empId).subscribe(
    (res)=>{
      this.referrals=res.allreferrals;
      this.referrals.forEach((referral)=>
      {
        if(referral.referraId!==null)
          {
            this.
          }
      })
    }
  )
}
}

