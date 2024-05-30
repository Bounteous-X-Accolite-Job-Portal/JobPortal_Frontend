import { Component } from '@angular/core';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Services/auth.service';
import { UserStoreService } from '../../../Services/user-store.service';
import { JobCardComponent } from '../../job-card/job-card.component';
import { Job } from '../../../Models/JobResponse/Job';
import { CommonModule } from '@angular/common';
import { JobApplication } from '../../../Models/JobApplicationResponse/JobApplication';
import { Status } from '../../../Models/Status';
import { ClosedApplicationService } from '../../../Services/ClosedApplication/closed-application.service';
import { JobService } from '../../../Services/Job/job.service';
import { ClosedJobServiceService } from '../../../Services/ClosedJob/closed-job-service.service';
import { ClosedJob } from '../../../Models/ClosedJobResponse/ClosedJob';
import { SpinnerService } from '../../../Services/spinner.service';

interface coupledData{
  application : JobApplication,
  job ?: Job, 
  closedJob ?: ClosedJob,
}

@Component({
  selector: 'app-applied-jobs',
  standalone: true,
  imports: [JobCardComponent,CommonModule],
  templateUrl: './applied-jobs.component.html',
  styleUrl: './applied-jobs.component.css'
})
export class AppliedJobsComponent {
  userId: string = "";
  candidateJobs: Job[] = [];
  candidateApplications: JobApplication[] = [];
  applicationStatus: Status[] = [];
  notApplied: boolean=false;

  rejectedApplicationData : coupledData[] = []

  constructor(
    private candidService : CandidateService,
    private userStore : UserStoreService,
    private auth : AuthService,
    private toastr : ToastrService,
    private closedApplicationService : ClosedApplicationService,
    private jobService: JobService,
    private closedJobService : ClosedJobServiceService,
    private spinnerService: SpinnerService,
  ) {}

  ngOnInit() : void{
    this.userStore.getIdFromStore()
    .subscribe((val) => {
      let idFromToken = this.auth.getIdFromToken();
      this.userId = val || idFromToken;
    })

    this.loadJobApplicationsApplied(this.userId);
    this.loadAllRejectedJobApplications(this.userId);
    this.loadsAppliedJobs(this.userId);
  }

  private loadJobApplicationsApplied(id:string)
  {
    this.spinnerService.showSpinner();

    this.candidService.getAllJobApplicationByCandidate(id).subscribe(
      (res) => {
        this.candidateApplications = res.allJobApplications;
        console.log("fetched applications : ",this.candidateApplications);
        this.toastr.success("Jobs fetched successfully");

        for(let i = 0; i < this.candidateApplications.length; i++){
            this.getStatusofApplication(this.candidateApplications[i].statusId);
        }

        // console.log("status : ",this.applicationStatus);
        this.spinnerService.hideSpinner();
      },
      (error) => {
        this.toastr.error("Error in fetching applied jobs");
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    )
  }

  private loadAllRejectedJobApplications(candidateId : string){
    this.spinnerService.showSpinner();

    this.closedApplicationService.getAllClosedApplicationsByCandidateId(candidateId).subscribe(
      (res) => {
        console.log("rejected applications", res);

        for (let index = 0; index < res.allJobApplications.length; index++) {
          if(res.allJobApplications[index].jobId !== undefined && res.allJobApplications[index].jobId !== null){
            let jobId = res.allJobApplications[index].jobId;
            this.jobService.getJobById(jobId === undefined ? "3fa85f64-5717-4562-b3fc-2c963f66afa6" : jobId).subscribe(
              (job) => {
                let data : coupledData = {
                  application : res.allJobApplications[index],
                  job : job.job
                }

                this.rejectedApplicationData.push(data);
              },
              (error) => {
                console.log(error)
              }
            )
          }
          else{
            let closedJobId = res.allJobApplications[index].closedJobId;
            this.closedJobService.getClosedJobById(closedJobId === undefined ? "3fa85f64-5717-4562-b3fc-2c963f66afa6" : closedJobId).subscribe(
              (closedJob) => {
                let data : coupledData = {
                  application : res.allJobApplications[index],
                  closedJob : closedJob.closedJob
                }

                this.rejectedApplicationData.push(data);
              },
              (error) => {
                console.log(error)
              }
            )
          }
        }

        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    )
  }

  private getStatusofApplication(id:number):void{
    this.spinnerService.showSpinner();

    this.candidService.getStatusByStatusId(id).subscribe(
      (res)=>{
        this.applicationStatus.push(res.statusViewModel);
        this.spinnerService.hideSpinner();
      },
      (error)=>{
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    )
  }

  private loadsAppliedJobs(id:string)
  {
    this.spinnerService.showSpinner();

    this.candidService.getAllAppliedJobsByCandidate(id).subscribe(
    (res) => {
      this.candidateJobs = res.allJobs;
      // console.log(this.candidateJobs);
      this.spinnerService.hideSpinner();
    },
    (error) => {
      console.log(error);
      this.spinnerService.hideSpinner();
    }
    )
  }
}
