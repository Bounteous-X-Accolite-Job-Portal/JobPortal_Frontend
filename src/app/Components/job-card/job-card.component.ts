import { Component, Input } from '@angular/core';
import { Job } from '../../Models/JobResponse/Job';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DegreeResponse } from '../../Models/DegreeResponse/DegreeRespose';
import { JobCategoryResponse } from '../../Models/JobCategoryResponse/JobCategoryResponse';
import { JobTypeResponse } from '../../Models/JobTypeResponse/JobTypeResponse';
import { JobLocationResponse } from '../../Models/JoblocationResponse/JobLocationResponse';
import { JobPositionResponse } from '../../Models/JobPositionResponse/JobPositionResponse';
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
  imports: [CommonModule , RouterLink , RouterOutlet],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css'
})
export class JobCardComponent {
  @Input() job !: Job;
  @Input() closedJob !: ClosedJob;

  isEmployee : boolean = false;
  hasPrivilege : boolean = false;

  location?: location ;
  degree?: Degree;
  jobtype?: JobType;
  jobcategory?: JobCategory;
  jobPosition?: position ;

  constructor(
    private jobService : JobService,
    private spinnerService : SpinnerService,
    private store : UserStoreService,
    private authService : AuthService,
  ) {
    this.checkUser();
    this.checkHasPrivilege();
  }

  ngOnInit():void{
    this.spinnerService.showSpinner();

    this.loadJobDetails();

    // this.loadLocationDetails();
    // this.loadPositionDetails();
    // this.loadCategoryDetails();
    // this.loadDegreeDetails();
    // this.loadTypeDetails();

    this.rectifyDate();

    console.log("job card - active job", this.job);
    console.log("job card - closed job ", this.closedJob);

    this.spinnerService.hideSpinner();
  }

  checkUser(){
    this.spinnerService.showSpinner();

    this.store.checkIsEmployeeFromStore()
    .subscribe((val) => {
        let emp = this.authService.checkIsEmployeeFromToken();
        this.isEmployee = val || emp;

        this.spinnerService.hideSpinner();
    })
  }

  checkHasPrivilege(){
    this.spinnerService.showSpinner();

    this.store.checkHasPrivilegeFromStore()
    .subscribe((val) => {
        let privilege = this.authService.checkHasPrivilegeFromToken();
        this.hasPrivilege = val || privilege;

        this.spinnerService.hideSpinner();
    })
  }

  loadJobDetails(){
    this.spinnerService.showSpinner();

    forkJoin({
      locationResponse : this.jobService.getLocationById(this.job !== undefined ? this.job.locationId : this.closedJob.locationId.toString()),
      positionResponse : this.jobService.getPositionById(this.job !== undefined ? this.job.positionId : this.closedJob.positionId.toString()),
      categoryResponse : this.jobService.getCategoryById(this.job !== undefined ? this.job.categoryId : this.closedJob.categoryId.toString()),
      degreeResponse : this.jobService.getDegreeById(this.job != undefined ? this.job.degreeId : this.closedJob.degreeId.toString()),
      typeResponse : this.jobService.getJobTypeById(this.job !== undefined ? this.job.jobType : this.closedJob.jobTypeId.toString())
    }).subscribe(
      (result) => {
        console.log("job card", result);
        
        this.location = result.locationResponse.jobLocation;
        this.jobPosition = result.positionResponse.jobPosition;
        this.jobcategory = result.categoryResponse.jobCategory;
        this.jobtype = result.typeResponse.jobType;
        this.degree = result.degreeResponse.degree;

        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    )
  }

  // private loadLocationDetails() : void
  // {
  //   this.spinnerService.showSpinner();

  //   this.jobService.getLocationById(this.job !== null ? this.job.locationId : (this.closedJob.locationId).toString()).subscribe(
  //     (loc: JobLocationResponse) => {
  //       this.location = loc.jobLocation;
  //       console.log("job loaction", loc);

  //       this.spinnerService.hideSpinner();
  //     },
  //     (error) =>{
  //       console.error(error);
  //       this.spinnerService.hideSpinner();
  //     }
  //   );
  // }

  // private loadPositionDetails(): void{
  //   this.spinnerService.showSpinner();

  //   this.jobService.getPositionById(this.job !== null ? this.job.positionId : this.closedJob?.positionId.toString()).subscribe(
  //     (pos: JobPositionResponse) => {
  //       this.jobPosition = pos.jobPosition;
  //       console.log("job position", pos);

  //       this.spinnerService.hideSpinner();
  //     },
  //     (error) =>{
  //       console.error(error);
  //       this.spinnerService.hideSpinner();
  //     }
  //   );
  // }

  // private loadCategoryDetails(): void{
  //   this.spinnerService.showSpinner();

  //   this.jobService.getCategoryById(this.job !== null ? this.job.categoryId : this.closedJob?.categoryId.toString()).subscribe(
  //     (cat : JobCategoryResponse) => {
  //       this.jobcategory = cat.jobCategory;
  //       console.log("job category",cat.jobCategory);

  //       this.spinnerService.hideSpinner();
  //     },
  //     (error) =>{
  //       console.error(error);
  //       this.spinnerService.hideSpinner();
  //     }
  //   );
  // }
    
  // private loadDegreeDetails(): void{
  //   this.spinnerService.showSpinner();

  //   this.jobService.getDegreeById(this.job != null ? this.job.degreeId : this.closedJob?.degreeId.toString()).subscribe(
  //     (deg : DegreeResponse) => {
  //       this.degree = deg.degree;
  //       console.log("job degree", deg);

  //       this.spinnerService.hideSpinner();
  //     },
  //     (error) =>{
  //       console.error(error);
  //       this.spinnerService.hideSpinner();
  //     }
  //   );
  // }

  // private loadTypeDetails() : void{
  //   this.spinnerService.showSpinner();

  //   this.jobService.getJobTypeById(this.job !== null ? this.job.jobType : this.closedJob?.jobTypeId.toString()).subscribe(
  //   (typ: JobTypeResponse) => {
  //     this.jobtype = typ.jobType;
  //     console.log("job type", this.jobtype);

  //     this.spinnerService.hideSpinner();
  //   },
  //   (error) =>{
  //     console.error(error);
  //     this.spinnerService.hideSpinner();
  //   }
  // );
  // }

  private rectifyDate() : void{
    this.spinnerService.showSpinner();

    if(this.job !== undefined){
      let date = this.job.lastDate.split("T");
      this.job.lastDate = date[0];
    }

    this.spinnerService.hideSpinner();
  }
}
