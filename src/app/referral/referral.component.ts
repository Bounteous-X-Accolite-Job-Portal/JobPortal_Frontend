import { Component, inject } from '@angular/core';
import { ReferralServiceService } from '../referral-service.service';
import { Referral } from '../referral';
import { JobService } from '../Services/Job/job.service';
import { Job } from '../Models/JobResponse/Job';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStoreService } from '../Services/user-store.service';
import { AuthService } from '../Services/auth.service';
import { GetReferral } from '../get-referral';
import { Referralresponse } from '../referralresponse';
import { CandidateService } from '../Services/CandidateService/candidate.service';
import { Guid } from 'guid-typescript';
import { CandidateResponse } from '../Models/CandidateAccountResponse/CandidateResponse';
import { JobResponse } from '../Models/JobResponse/JobResponse';
import { ReferralResponse } from '../Models/ReferralResponse/ReferralResponse';
import { forkJoin } from 'rxjs';
import { Application } from 'express';
import { ApplicationServiceService } from '../Services/ApplicationService/application-service.service';
import { StatusServiceService } from '../status-service.service';



@Component({
  selector: 'app-referral',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './referral.component.html',
  styleUrl: './referral.component.css'
})
export class ReferralComponent {
  //httpService=inject(ReferralServiceService)
  //httpServiceCandidate=inject(CandidateService)
  
  //jobs: Job[] = [];
  // candidateDetails: { [candidateId: string]: CandidateResponse } = {}; 
  //candidateDetails : CandidateResponse[] = [];

  referralData: ReferralResponse[] = [];


  // jobId:string='';
  value: any;
  empId:string="";
  //candidateId:string='';
  referrals:Referralresponse[]=[];
  constructor(private referalService: ReferralServiceService,
    private jobService:JobService,
    private candidateService:CandidateService,
    private router:Router,
    private userStore : UserStoreService,
    private auth : AuthService,
    private StatusService:StatusServiceService
  ) { }

  ngOnInit():void{
    this.loadreferralofEmplyoee();
  }

private loadreferralofEmplyoee():void{
this.userStore.getIdFromStore().subscribe((val)=> {
console.log(val);
let idFromToken=this.auth.getIdFromToken();
console.log(idFromToken);
this.empId=val || idFromToken;
console.log("Emplyoee Id of Logged Inuser",this.empId);

})
this.referalService.getreferral(this.empId).subscribe(
  (res:GetReferral)=>{
    console.log("response",res);
    this.referrals=res.referrals;

    console.log("Hey", this.referrals);
    for (let i = 0; i < this.referrals.length; i++) {
      const jobId=this.referrals[i].jobId?.toString();
      const candidateId = this.referrals[i].candidateId?.toString(); 
      const statusId=this.referrals[i].statusId;
      //console.log(statusId)
      
      if (candidateId !== undefined && jobId !== undefined && statusId!==undefined) {
        console.log("Status Id", statusId);

        forkJoin({
          candidateDetails : this.candidateService.getCandidateById(candidateId),
          jobDetails : this.jobService.getJobById(jobId),
          statusDetails:this.StatusService.getstatus(statusId)
        }).subscribe(
          (result) => {
            console.log("all data ", result);

            let data : ReferralResponse = {
              candidate : result.candidateDetails.candidate,
              referral : res.referrals[i],
              job : result.jobDetails.job,
              statusData: result.statusDetails.statusViewModel
            } 
            console.log(data)
            this.referralData.push(data);
          },
          (error) => {
            console.log(error);
          }
        )

        // this.candidateService.getCandidateById(candidateId).subscribe(
        //   (candidateDetails: CandidateResponse) => {
        //     console.log("Candidate Details:", candidateDetails);
            
        //     this.referralData.push()
        //     this.candidateDetails[candidateId] = candidateDetails; 
            
        //   },
        //   (error) => {
        //     console.log("Error fetching candidate details:", error);
        //   }
        // );
      } else {
        console.log("Candidate ID is undefined.");
      }
      // for(let j=0;j<this.referrals.length;j++)
      //   {
      //     const jobId=this.referrals[j].jobId?.toString();
      //     if(jobId!==undefined){
      //       //console.log("JobId",jobId);
      //       this.jobService.getJobById(jobId).subscribe(
      //         (jobDetails:JobResponse)=>
      //           {
      //             console.log("Job Details",jobDetails);
      //           }
      //       )
      //     }
      //   }
      
    }
    
  },
  (error) => {
    console.log("Error fetching referrals:", error);
  }
);


    //console.log("referrals : ",this.referrals);
    //console.log("candid : ",this.candidateDetails);
}

  // private loadJobs():void{
  //   this.jobService.getAllJobs().subscribe(
  //     (res) => {
  //       this.jobs = res.allJobs;
  //       // this.value=this.jobId;
  //       console.log(this.value);
  //       console.log(this.jobs);
  //     },
  //     (error) => {
  //       console.error('Error loading Jobs',error);
  //     }
  //   );
  // }

  // addrefrral(jobId:string) {
  //   console.log("passed jobId ; ",jobId);
  //   this.jobService.jobId =jobId;
  //   console.log("serice job ; ",this.jobService.jobId);
  //  this.router.navigate(['employee-dashboard','addReferral']);
  // }
  
}



