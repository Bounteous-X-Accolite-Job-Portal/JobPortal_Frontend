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
import { SpinnerService } from '../../../Services/spinner.service';

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

  constructor(
    private candidService : CandidateService,
    private userStore : UserStoreService,
    private auth : AuthService,
    private toastr : ToastrService,
    private spinner : SpinnerService
  ) {}

  ngOnInit() : void{
    this.userStore.getIdFromStore()
    .subscribe((val) => {
      // console.log(val);
      let idFromToken = this.auth.getIdFromToken();
      // console.log(idFromToken);
      this.userId = val || idFromToken;
      // console.log("Logged User Id : ",this.userId);
    })

    this.loadJobApplicationsApplied(this.userId);
    this.loadsAppliedJobs(this.userId);
  }

  private loadJobApplicationsApplied(id:string)
  {
    this.spinner.showSpinner();
    this.candidService.getAllJobApplicationByCandidate(id).subscribe(
    (res) => {
      this.candidateApplications = res.allJobApplications;
      // console.log("fetched applications : ",this.candidateApplications);
      // this.toastr.success("Jobs fetched successfully");
      for(let i = 0;i<this.candidateApplications.length;i++)
          this.getStatusofApplication(this.candidateApplications[i].statusId);
      this.spinner.hideSpinner();
      // console.log("status : ",this.applicationStatus);
    },
    (error) => {
      this.toastr.error("Error in fetching applied jobs");
      console.log(error);
      this.spinner.hideSpinner();
    }
    )
  }
  
  private getStatusofApplication(id:number):void{
    this.candidService.getStatusByStatusId(id).subscribe(
      (res)=>{
        this.applicationStatus.push(res.statusViewModel);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  private loadsAppliedJobs(id:string)
  {
    this.candidService.getAllAppliedJobsByCandidate(id).subscribe(
    (res) => {
      this.candidateJobs = res.allJobs;
      // console.log(this.candidateJobs);
    },
    (error) => {
      console.log(error);
    }
    )
  }
}
