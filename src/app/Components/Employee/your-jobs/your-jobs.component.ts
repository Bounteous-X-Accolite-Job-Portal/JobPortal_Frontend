import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../../Services/spinner.service';
import { JobService } from '../../../Services/Job/job.service';
import { AllJob } from '../../../Models/JobResponse/AllJobs';
import { Guid } from 'guid-typescript';
import { UserStoreService } from '../../../Services/user-store.service';
import { AuthService } from '../../../Services/auth.service';
import { JobCardComponent } from '../../job-card/job-card.component';
import { CommonModule } from '@angular/common';
import { Job } from '../../../Models/JobResponse/Job';
import { ClosedJob } from '../../../Models/ClosedJobResponse/ClosedJob';
import { ClosedJobServiceService } from '../../../Services/ClosedJob/closed-job-service.service';
import { AllClosedJobsResponse } from '../../../Models/ClosedJobResponse/AllClosedJobsResponse';

@Component({
  selector: 'app-your-jobs',
  standalone: true,
  imports: [JobCardComponent, CommonModule],
  templateUrl: './your-jobs.component.html',
  styleUrl: './your-jobs.component.css'
})
export class YourJobsComponent implements OnInit{
  public ActiveJobToggle: boolean = true;

  employeeId !: Guid;
  jobs : Job[] = [];
  closedJobs : ClosedJob[] = [];

  constructor(
    private spinnerService: SpinnerService,
    private jobService: JobService,
    private store: UserStoreService,
    private authService: AuthService,
    private closedJobService: ClosedJobServiceService,
  ) { }

  ngOnInit(): void {
    this.store.getIdFromStore()
    .subscribe((val) => {
        let id = this.authService.getIdFromToken();
        this.employeeId = val || id;
    })

    this.loadJobs();
    this.loadClosedJobs();
  }

  ActiveJobs() {
    this.ActiveJobToggle = true;
  }

  ClosedJobs() {
    this.ActiveJobToggle = false;
  }

  loadJobs(){
    this.spinnerService.showSpinner();

    this.jobService.getAllJobsAddedByLoggedInEmployee(this.employeeId).subscribe(
      (res : AllJob) => {
        console.log("active jobs", res);

        this.jobs = res.allJobs;

        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    )
  }

  loadClosedJobs(){
    this.spinnerService.showSpinner();

    this.closedJobService.getAllJobsAddedByLoggedInEmployee(this.employeeId).subscribe(
      (res : AllClosedJobsResponse) => {
        console.log("closed Jobs", res);

        this.closedJobs = res.closedJobs;

        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    )
  }
}
