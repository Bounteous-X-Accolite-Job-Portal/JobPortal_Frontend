import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../Services/job.service';
import { Job } from '../../Models/JobResponse/Job';
import { location } from '../../Models/JoblocationResponse/location';
import { Degree } from '../../Models/DegreeResponse/Degree';
import { JobType } from '../../Models/JobTypeResponse/JobType';
import { JobCategory } from '../../Models/JobCategoryResponse/JobCategory';
import { position } from '../../Models/JobPositionResponse/position';
import { JobResponse } from '../../Models/JobResponse/JobResponse';
import { DegreeResponse } from '../../Models/DegreeResponse/DegreeRespose';
import { JobCategoryResponse } from '../../Models/JobCategoryResponse/JobCategoryResponse';
import { JobTypeResponse } from '../../Models/JobTypeResponse/JobTypeResponse';
import { JobLocationResponse } from '../../Models/JoblocationResponse/JobLocationResponse';
import { JobPositionResponse } from '../../Models/JobPositionResponse/JobPositionResponse';

@Component({
  selector: 'app-jobdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobdetails.component.html',
  styleUrl: './jobdetails.component.css'
})
export class JobdetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);  
  job?: Job;
  location?: location ;
  degree?: Degree;
  jobtype?: JobType;
  jobcategory?: JobCategory;
  jobPosition?: position ;

  constructor(private jobService : JobService) {}

  ngOnInit():void{
    this.loadJobDetails();
  }
  
  private loadJobDetails(): void{
    const id = String(this.route.snapshot.params['jobId']);
    this.jobService.getJobById(id).subscribe(event => {
      this.job = event.job;
      this.loadLocationDetails();
      this.loadPositionDetails();
      this.loadCategoryDetails();
      this.loadDegreeDetails();
      this.loadTypeDetails();
    });
  }

  private loadLocationDetails() : void
  {
    this.jobService.getLocationById(this.job?.locationId).subscribe(
      (loc: JobLocationResponse) => {
        this.location = loc.jobLocation;
        console.log(loc);
      },
      (error) =>{
        console.error(error);
      }
    );
  }

  private loadPositionDetails(): void{
    this.jobService.getPositionById(this.job?.positionId).subscribe(
      (pos: JobPositionResponse) => {
        this.jobPosition = pos.jobPosition;
        console.log(pos);
      },
      (error) =>{
        console.error(error);
      }
    );
  }

  private loadCategoryDetails(): void{
    this.jobService.getCategoryById(this.job?.categoryId).subscribe(
      (cat : JobCategoryResponse) => {
        this.jobcategory = cat.jobCategory;
        console.log("cat  :"+cat.jobCategory);
      },
      (error) =>{
        console.error(error);
      }
    );
  }
    
  private loadDegreeDetails(): void{
    this.jobService.getDegreeById(this.job?.degreeId).subscribe(
      (deg : DegreeResponse) => {
        this.degree = deg.degree;
        console.log("deg : "+deg);
      },
      (error) =>{
        console.error(error);
      }
    );
  }

  private loadTypeDetails() : void{
    this.jobService.getJobTypeById(this.job?.jobType).subscribe(
    (typ: JobTypeResponse) => {
      this.jobtype = typ.jobType;
      console.log(this.jobtype);
    },
    (error) =>{
      console.error(error);
    }
  );
  }
}
