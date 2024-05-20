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

@Component({
  selector: 'app-your-jobs',
  standalone: true,
  imports: [JobCardComponent, CommonModule],
  templateUrl: './your-jobs.component.html',
  styleUrl: './your-jobs.component.css'
})
export class YourJobsComponent implements OnInit{
  employeeId !: Guid;
  jobs : Job[] = [];

  constructor(
    private spinnerService: SpinnerService,
    private jobService: JobService,
    private store: UserStoreService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.store.getIdFromStore()
    .subscribe((val) => {
        let id = this.authService.getIdFromToken();
        this.employeeId = val || id;
    })

    this.loadJobs();
  }

  loadJobs(){
    this.spinnerService.showSpinner();

    this.jobService.getAllJobsAddedByLoggedInEmployee(this.employeeId).subscribe(
      (res : AllJob) => {
        console.log(res);

        this.jobs = res.allJobs;

        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    )
  }
}
