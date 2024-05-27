import { Component, OnInit } from '@angular/core';
import { Referral } from '../../../Models/ReferralResponse/referral';
import { ReferralServiceService } from '../../../Services/ReferralService/referral-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobService } from '../../../Services/Job/job.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-referral',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,ToastrModule],
  templateUrl: './add-referral.component.html',
  styleUrl: './add-referral.component.css'
})


export class AddReferralComponent implements OnInit  {
  referralForm!: FormGroup;
  referralObj:Referral=new Referral();
  jobId: string='';

  constructor(
    private formBuilder: FormBuilder,
    private referralService:ReferralServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private jobService:JobService,
    private toastr:ToastrService
  ){}

ngOnInit()
{
  this.jobId=this.jobService.jobId;
}

  addreferal()
  {
    this.referralObj.jobId=this.jobId;
  
    this.referralService.addreferral(this.referralObj).subscribe(
      (res:any)=>
        {
          console.log(this.referralObj)
          console.log("Success");
          this.toastr.success("Referral Done");
        },
        (error:any) => {
          this.toastr.error("OOPS!! Referral Cant be added")
          console.error('Error deleting degree:', error);}

    );
  
  }
}