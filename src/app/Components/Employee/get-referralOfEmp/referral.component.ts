import { Component } from '@angular/core';
import { ReferralServiceService } from '../../../Services/ReferralService/referral-service.service';
import { JobService } from '../../../Services/Job/job.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserStoreService } from '../../../Services/user-store.service';
import { AuthService } from '../../../Services/auth.service';
import { GetReferral } from '../../../Models/ReferralResponse/get-referral';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { forkJoin } from 'rxjs';
import { StatusServiceService } from '../../../Services/Status/status-service.service';
import { ReferralCompleteResponse } from '../../../Models/ReferralResponse/ReferralCompleteResponse';
import { ToastrService } from 'ngx-toastr';
import { ClosedJobServiceService } from '../../../Services/ClosedJob/closed-job-service.service';
import { ApplicationServiceService } from '../../../Services/ApplicationService/application-service.service';
import { ClosedApplicationService } from '../../../Services/ClosedApplication/closed-application.service';
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

  referral : ReferralCompleteResponse[] = [];

  constructor(
    private referalService: ReferralServiceService,
    private jobService: JobService,
    private closedJobService : ClosedJobServiceService,
    private candidateService: CandidateService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private StatusService: StatusServiceService,
    private toastr: ToastrService,
    private spinnerService: SpinnerService,
    private applicationService : ApplicationServiceService,
    private closedApplicationService : ClosedApplicationService
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
        console.log("response ar referral",res);

        for (let i = 0; i < res.referrals.length; i++) {
          const jobId = res.referrals[i].jobId;
          const closedJobId = res.referrals[i].closedJobId;
          const candidateId = res.referrals[i].candidateId.toString();
          const applicationId = res.referrals[i].applicationId;
          let statusId = res.referrals[i].statusId;
          const closedApplicationId = res.referrals[i].closedApplicationId;

          if((applicationId === undefined || applicationId === null) && (closedApplicationId === undefined || closedApplicationId === null)) {
            forkJoin({
              candidateDetails: this.candidateService.getCandidateById(candidateId),
              jobDetails: this.jobService.getJobById(jobId ? jobId.toString() : "3fa85f64-5717-4562-b3fc-2c963f66afa6"),
              closedJobDetails: this.closedJobService.getClosedJobById(closedJobId ? closedJobId.toString() : "3fa85f64-5717-4562-b3fc-2c963f66afa6"),
              statusDetails: this.StatusService.getstatus(statusId),
            }).subscribe(
              (result) => {
                // console.log("all data ", result);
                
                let data : ReferralCompleteResponse = {
                  candidate : result.candidateDetails.candidate,
                  job : result.jobDetails.job,
                  statusData : result.statusDetails.statusViewModel,
                  closedJob : result.closedJobDetails.closedJob
                }
                
                this.referral.push(data);

                console.log(result);
            },
            (error) => {
              // console.log(error);
              this.toastr.error('Error: ', error);
            })
          }
          else{
            if(applicationId !== undefined && applicationId !== null){
              this.applicationService.getApplicationsById(applicationId.toString()).subscribe(
                (element) => {
                  forkJoin({
                    candidateDetails: this.candidateService.getCandidateById(candidateId),
                    jobDetails: this.jobService.getJobById(jobId ? jobId.toString() : "3fa85f64-5717-4562-b3fc-2c963f66afa6"),
                    closedJobDetails: this.closedJobService.getClosedJobById(closedJobId ? closedJobId.toString() : "3fa85f64-5717-4562-b3fc-2c963f66afa6"),
                    statusDetails: this.StatusService.getstatus(element.application.statusId),
                  }).subscribe(
                    (result) => {
                      // console.log("all data ", result);
      
                      let data : ReferralCompleteResponse = {
                        candidate : result.candidateDetails.candidate,
                        job : result.jobDetails.job,
                        statusData : result.statusDetails.statusViewModel,
                        closedJob : result.closedJobDetails.closedJob
                      }
                      
                      this.referral.push(data);
      
                      console.log(result);
                  },
                  (error) => {
                    // console.log(error);
                    this.toastr.error('Error: ', error);
                  })
                }
              )
            }
            else if(closedApplicationId !== undefined && closedApplicationId !== null){
              this.closedApplicationService.getClosedApplicationById(closedApplicationId.toString()).subscribe(
                (element) => {
                  forkJoin({
                    candidateDetails: this.candidateService.getCandidateById(candidateId),
                    jobDetails: this.jobService.getJobById(jobId ? jobId.toString() : "3fa85f64-5717-4562-b3fc-2c963f66afa6"),
                    closedJobDetails: this.closedJobService.getClosedJobById(closedJobId ? closedJobId.toString() : "3fa85f64-5717-4562-b3fc-2c963f66afa6"),
                    statusDetails: this.StatusService.getstatus(element.application.statusId),
                  }).subscribe(
                    (result) => {
                      // console.log("all data ", result);
      
                      let data : ReferralCompleteResponse = {
                        candidate : result.candidateDetails.candidate,
                        job : result.jobDetails.job,
                        statusData : result.statusDetails.statusViewModel,
                        closedJob : result.closedJobDetails.closedJob
                      }
                      
                      this.referral.push(data);
      
                      console.log(result);
                  },
                  (error) => {
                    // console.log(error);
                    this.toastr.error('Error: ', error);
                  })
                }
              )
            }
          }
        }
    },
    (error) => {
      console.log("Error fetching referrals:", error);
    }
);



}


  
}



