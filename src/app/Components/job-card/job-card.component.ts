import { Component, Input, input } from '@angular/core';
import { Job } from '../../Models/JobResponse/Job';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { location } from '../../Models/JoblocationResponse/location';
import { Degree } from '../../Models/DegreeResponse/Degree';
import { JobType } from '../../Models/JobTypeResponse/JobType';
import { JobCategory } from '../../Models/JobCategoryResponse/JobCategory';
import { position } from '../../Models/JobPositionResponse/position';
import { JobService } from '../../Services/Job/job.service';
import { SpinnerService } from '../../Services/spinner.service';
import { ClosedJob } from '../../Models/ClosedJobResponse/ClosedJob';
import { forkJoin } from 'rxjs';
import { UserStoreService } from '../../Services/user-store.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterModule],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  @Input() job!: Job;
  @Input() closedJob!: ClosedJob;
  @Input() canEdit!: boolean;
  @Input() isActive!: boolean;

  isEmployee: boolean = false;
  hasPrivilege: boolean = false;

  location?: location;
  degree?: Degree;
  jobtype?: JobType;
  jobcategory?: JobCategory;
  jobPosition?: position;

  constructor(
    private jobService: JobService,
    private spinnerService: SpinnerService,
    private store: UserStoreService,
    private authService: AuthService,
    private router : Router
  ) {
    this.checkUser();
    this.checkHasPrivilege();
  }

  ngOnInit(): void {
    this.spinnerService.showSpinner();
    // console.log('job details', this.job);

    this.loadJobDetails();

    this.rectifyDate();

    // console.log("job card - active job", this.job);
    // console.log("job card - closed job ", this.closedJob);

    this.spinnerService.hideSpinner();
  }

  checkUser() {
    this.spinnerService.showSpinner();

    this.store.checkIsEmployeeFromStore().subscribe((val) => {
      let emp = this.authService.checkIsEmployeeFromToken();
      this.isEmployee = val || emp;

      this.spinnerService.hideSpinner();
    });
  }

  checkHasPrivilege() {
    this.spinnerService.showSpinner();

    this.store.checkHasPrivilegeFromStore().subscribe((val) => {
      let privilege = this.authService.checkHasPrivilegeFromToken();
      this.hasPrivilege = val || privilege;

      this.spinnerService.hideSpinner();
    });
  }

  loadJobDetails() {
    this.spinnerService.showSpinner();

    forkJoin({
      locationResponse: this.jobService.getLocationById(
        this.job !== undefined
          ? this.job.locationId
          : this.closedJob.locationId.toString()
      ),
      positionResponse: this.jobService.getPositionById(
        this.job !== undefined
          ? this.job.positionId
          : this.closedJob.positionId.toString()
      ),
      categoryResponse: this.jobService.getCategoryById(
        this.job !== undefined
          ? this.job.categoryId
          : this.closedJob.categoryId.toString()
      ),
      degreeResponse: this.jobService.getDegreeById(
        this.job != undefined
          ? this.job.degreeId
          : this.closedJob.degreeId.toString()
      ),
      typeResponse: this.jobService.getJobTypeById(
        this.job !== undefined
          ? this.job.jobType
          : this.closedJob.jobTypeId.toString()
      ),
    }).subscribe(
      (result) => {
        // console.log("job card", result);

        this.location = result.locationResponse.jobLocation;
        this.jobPosition = result.positionResponse.jobPosition;
        this.jobcategory = result.categoryResponse.jobCategory;
        this.jobtype = result.typeResponse.jobType;
        this.degree = result.degreeResponse.degree;

        this.spinnerService.hideSpinner();

        // console.log(this.job);
      },
      (error) => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  private rectifyDate(): void {
    this.spinnerService.showSpinner();

    if (this.job !== undefined) {
      let date = this.job.lastDate.split('T');
      this.job.lastDate = date[0];
    }
    if (this.closedJob !== undefined) {
      let date = this.closedJob.lastDate.split('T');
      this.closedJob.lastDate = date[0];
    }

    this.spinnerService.hideSpinner();
  }

  public disableJob(): void {
    var response = confirm('Do you want to disable this job ? ');
    if (response) {
      this.spinnerService.showSpinner();
      this.jobService.disableJob(this.job.jobId).subscribe(
        (res) => {
          // console.log(res);
          this.spinnerService.hideSpinner();
          this.router.navigate(['jobs']);
          
        },
        (error) => {
          console.log(error);
          this.spinnerService.hideSpinner();
          
        }
      );
    } else {
      // console.log('You Denied to Disable Job !!');
    }
  }
}
