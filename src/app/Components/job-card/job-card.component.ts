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

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule , RouterLink , RouterOutlet],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css'
})
export class JobCardComponent {
  @Input() job !: Job;
  location?: location ;
  degree?: Degree;
  jobtype?: JobType;
  jobcategory?: JobCategory;
  jobPosition?: position ;

  constructor(
    private jobService : JobService,
    private spinnerService : SpinnerService,
  ) {}

  ngOnInit():void{
    this.spinnerService.showSpinner();

    this.loadLocationDetails();
    this.loadPositionDetails();
    this.loadCategoryDetails();
    this.loadDegreeDetails();
    this.loadTypeDetails();

    this.rectifyDate();

    console.log("job card ", this.job);

    this.spinnerService.hideSpinner();
  }

  private loadLocationDetails() : void
  {
    this.spinnerService.showSpinner();

    this.jobService.getLocationById(this.job?.locationId).subscribe(
      (loc: JobLocationResponse) => {
        this.location = loc.jobLocation;
        console.log(loc);

        this.spinnerService.hideSpinner();
      },
      (error) =>{
        console.error(error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  private loadPositionDetails(): void{
    this.spinnerService.showSpinner();

    this.jobService.getPositionById(this.job?.positionId).subscribe(
      (pos: JobPositionResponse) => {
        this.jobPosition = pos.jobPosition;
        console.log(pos);

        this.spinnerService.hideSpinner();
      },
      (error) =>{
        console.error(error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  private loadCategoryDetails(): void{
    this.spinnerService.showSpinner();

    this.jobService.getCategoryById(this.job?.categoryId).subscribe(
      (cat : JobCategoryResponse) => {
        this.jobcategory = cat.jobCategory;
        console.log("cat  :"+cat.jobCategory);

        this.spinnerService.hideSpinner();
      },
      (error) =>{
        console.error(error);
        this.spinnerService.hideSpinner();
      }
    );
  }
    
  private loadDegreeDetails(): void{
    this.spinnerService.showSpinner();

    this.jobService.getDegreeById(this.job?.degreeId).subscribe(
      (deg : DegreeResponse) => {
        this.degree = deg.degree;
        console.log("deg : "+deg);

        this.spinnerService.hideSpinner();
      },
      (error) =>{
        console.error(error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  private loadTypeDetails() : void{
    this.spinnerService.showSpinner();

    this.jobService.getJobTypeById(this.job?.jobType).subscribe(
    (typ: JobTypeResponse) => {
      this.jobtype = typ.jobType;
      console.log(this.jobtype);

      this.spinnerService.hideSpinner();
    },
    (error) =>{
      console.error(error);
      this.spinnerService.hideSpinner();
    }
  );
  }

  private rectifyDate() : void{
    this.spinnerService.showSpinner();

    let date = this.job.lastDate.split("T");
    this.job.lastDate = date[0];

    this.spinnerService.hideSpinner();
  }
}
