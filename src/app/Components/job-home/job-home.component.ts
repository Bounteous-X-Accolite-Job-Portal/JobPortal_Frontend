import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { JobCardComponent } from '../job-card/job-card.component';
import { JobService } from '../../Services/job.service';
import { JobType } from '../../Models/JobTypeResponse/JobType';
import { JobCategory } from '../../Models/JobCategoryResponse/JobCategory';
import { location } from '../../Models/JoblocationResponse/location';
import { position } from '../../Models/JobPositionResponse/position';
import { Job } from '../../Models/JobResponse/Job';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-job-home',
  templateUrl: './job-home.component.html',
  imports: [CommonModule, JobCardComponent, ReactiveFormsModule, ToastrModule],
  styleUrls: ['./job-home.component.css'],
  moduleId: module.id, 
})
export class JobHomeComponent  {
  toaster = inject(ToastrService);

  locations: location[] = [];
  jobTypes: JobType[] = [];
  jobCategories: JobCategory[] = [];
  jobPositions: position[] =[];
  jobs: Job[] = [];
  Filterjobs: Job[] = [];

  positionIndex: number = 0;
  typeIndex: number = 0;
  locationIndex: number = 0;
  categoryIndex: number = 0;
  
  constructor(private jobService: JobService , private fb : FormBuilder ) {}
  filtersForm = this.fb.group({
    location: [''],
    jobType: [''],
    jobCategory: [''],
    jobPosition:['']
  });


  ngOnInit(): void {
    this.locations.push({locationId: "null" , address: "Select Job Location :" , city: "" , state: "" , country : ""});
    this.loadJobLocations();

    this.jobTypes.push({jobTypeId: "null" , typeName : " Select Job Type :"});
    this.loadJobTypes();

    this.jobCategories.push({categoryId:"null",categoryCode:"Select Job Category :",categoryName:"",description:""})
    this.loadJobCategories();
    
    this.jobPositions.push({positionId:"null",positionName:"Select Job Position :",positionCode:"",description:""});
    this.loadJobPositions();

    this.loadJobs();
  }

  private loadJobLocations(): void {
    this.jobService.getAllJobLocations().subscribe(
      (res) => {
        // this.locations = res.allJobLocations;
        this.locations= this.locations.concat(res.allJobLocations);
        console.log(this.locations);
      },
      (error) => {
        console.error('Error loading job locations:', error);
      }
    );
  }

  private loadJobTypes(): void {
    this.jobService.getAllJobTypes().subscribe(
      (res) => {
        // this.jobTypes = res.allJobTypes;
        this.jobTypes = this.jobTypes.concat(res.allJobTypes);
        console.log(this.jobTypes);
      },
      (error) => {
        console.error('Error loading job types:', error);
      }
    );
  }

  private loadJobCategories(): void {
    this.jobService.getAllJobCategories().subscribe(
      (res) => {
        // this.jobCategories = res.allJobCategory;
        this.jobCategories = this.jobCategories.concat(res.allJobCategory);
        console.log(this.jobCategories);
      },
      (error) => {
        console.error('Error loading job categories:', error);
      }
    );
  }

  private loadJobPositions(): void{
    this.jobService.getAllJobPosition().subscribe(
      (res) => {
        this.jobPositions = this.jobPositions.concat(res.allJobPositions);
        console.log(this.jobPositions);
      },
      (error) => {
        console.error('Error loading job Positions:',error);
      }
    );
  }

  private loadJobs():void{
    this.jobService.getAllJobs().subscribe(
      (res) => {
        this.jobs = res.allJobs;
        this.Filterjobs = this.jobs;
        console.log(this.Filterjobs);
      },
      (error) => {
        console.error('Error loading Jobs',error);
      }
    );
  }

  public onSubmit() : void{
    if(this.categoryIndex==0 && this.locationIndex==0 && this.positionIndex==0 && this.typeIndex==0)
    {
      return;
    }

    console.log(this.jobPositions[this.positionIndex]);
    console.log(this.jobCategories[this.categoryIndex]);
    console.log(this.jobTypes[this.typeIndex]);
    console.log(this.locations[this.locationIndex]);
    
    this.filterJobs(this.jobPositions[this.positionIndex].positionId,this.locations[this.locationIndex].locationId,this.jobTypes[this.typeIndex].jobTypeId,this.jobCategories[this.categoryIndex].categoryId); 
  }

  private filterJobs(positionId: string , locationId : string , typeId : string , categoryId : string) : void
  {
    this.Filterjobs = [];
    let typecheck: boolean = false;
    let positioncheck: boolean = false;
    let locationcheck: boolean = false;
    let categorycheck: boolean = false;

    if(positionId!="null")
        positioncheck = true;
    if(locationId!="null")
        locationcheck = true;
    if(categoryId!="null")
        categorycheck = true;
    if(typeId!="null")
        typecheck = true;

    this.jobs.forEach((job) =>
      {      
        let flg:boolean  = true;
        if(positioncheck)
        {
          if(job.positionId != positionId)
              flg = false;
        }
        if(locationcheck)
        {
          if(job.locationId != locationId)
              flg = false;
        }
        if(typecheck)
        {
          if(job.jobType != typeId)
              flg = false;
        }
        if(categorycheck)
        {
          if(job.categoryId != categoryId)
            flg = false;
        }
        
        
        if(flg)
        {
          this.Filterjobs.push(job);
        }
      }

    );
    if(this.Filterjobs.length>0)
      this.displayJobsToast();
    else
    {
      this.displayEmptyJobsToast();
      this.resetFilters();
    }
  }

  public resetFilters():void
  {
    this.Filterjobs = this.jobs;
    this.categoryIndex =0;
    this.positionIndex =0;
    this.locationIndex =0;
    this.typeIndex =0;

    this.displayResetToast();
  }

  private displayResetToast(): void
  {
    this.toaster.success("Filters Reset Successfully !!");
  }
  
  private displayEmptyJobsToast(): void
  {
    this.toaster.error("No Jobs Found !!");
  }
  
  private displayJobsToast(): void
  {
    this.toaster.success("Jobs Found !!");
  }
}
