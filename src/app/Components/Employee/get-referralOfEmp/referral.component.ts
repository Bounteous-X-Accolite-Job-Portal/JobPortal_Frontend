import { Component } from '@angular/core';
import { ReferralServiceService } from '../../../Services/ReferralService/referral-service.service';
import { JobService } from '../../../Services/Job/job.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserStoreService } from '../../../Services/user-store.service';
import { AuthService } from '../../../Services/auth.service';
import { GetReferral } from '../../../Models/ReferralResponse/get-referral';
import { ReferralResponse } from '../../../Models/ReferralResponse/ReferralResponse';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { forkJoin } from 'rxjs';
import { StatusServiceService } from '../../../Services/Status/status-service.service';
import { ReferralCompleteResponse } from '../../../Models/ReferralResponse/ReferralCompleteResponse';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../../Services/spinner.service';

@Component({
  selector: 'app-referral',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterLink],
  templateUrl: './referral.component.html',
  styleUrl: './referral.component.css',
})
export class ReferralComponent {
  referralData: ReferralCompleteResponse[] = [];

  value: any;
  empId: string = '';
  referrals: ReferralResponse[] = [];

  constructor(
    private referalService: ReferralServiceService,
    private jobService: JobService,
    private candidateService: CandidateService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private StatusService: StatusServiceService,
    private toastr: ToastrService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.loadreferralofEmplyoee();
  }

  private loadreferralofEmplyoee(): void {
    this.spinnerService.showSpinner();
    this.userStore.getIdFromStore().subscribe((val) => {
      // console.log(val);
      let idFromToken = this.auth.getIdFromToken();
      // console.log(idFromToken);
      this.empId = val || idFromToken;
      // console.log("Emplyoee Id of Logged Inuser",this.empId);
    });
    this.referalService.getreferral(this.empId).subscribe(
      (res: GetReferral) => {
        // console.log("response",res);
        this.referrals = res.referrals;

        // console.log("Hey", this.referrals);
        for (let i = 0; i < this.referrals.length; i++) {
          const jobId = this.referrals[i].jobId?.toString();
          const candidateId = this.referrals[i].candidateId?.toString();
          const statusId = this.referrals[i].statusId;
          //console.log(statusId)

          if (
            candidateId !== undefined &&
            jobId !== undefined &&
            statusId !== undefined
          ) {
            // console.log("Status Id", statusId);

            forkJoin({
              candidateDetails:
                this.candidateService.getCandidateById(candidateId),
              jobDetails: this.jobService.getJobById(jobId),
              statusDetails: this.StatusService.getstatus(statusId),
            }).subscribe(
              (result) => {
                // console.log("all data ", result);

            let data : ReferralCompleteResponse = {
              candidate : result.candidateDetails.candidate,
              referral : res.referrals[i],
              job : result.jobDetails.job,
              statusData: result.statusDetails.statusViewModel
            } 
            // console.log(data)
            this.referralData.push(data);
            this.spinnerService.hideSpinner();
            // console.log(result);
          },
          (error) => {
            // console.log(error);
            this.spinnerService.hideSpinner();
            this.toastr.error('Error: ', error);
          }
        )
        
      } else {
        this.spinnerService.hideSpinner();
        console.log("Candidate ID is undefined.");
      }
      
    }
    
  },
  (error) => {
    this.spinnerService.hideSpinner();
    console.log("Error fetching referrals:", error);
  }
);



}


  
}



