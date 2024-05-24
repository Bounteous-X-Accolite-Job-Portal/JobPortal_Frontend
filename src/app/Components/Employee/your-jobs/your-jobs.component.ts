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
import { JobCategory } from '../../../Models/JobCategoryResponse/JobCategory';
import { position } from '../../../Models/JobPositionResponse/position';
import { JobType } from '../../../Models/JobTypeResponse/JobType';
import { location } from '../../../Models/JoblocationResponse/location';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-your-jobs',
  standalone: true,
  imports: [JobCardComponent, CommonModule,ReactiveFormsModule],
  templateUrl: './your-jobs.component.html',
  styleUrl: './your-jobs.component.css'
})
export class YourJobsComponent implements OnInit{
  public ActiveJobToggle: boolean = true;

  employeeId !: Guid;
  locations: location[]= [];
  jobTypes: JobType[] = [];
  jobCategories: JobCategory[] = [];

  jobPositions: position[] =[];
  categoryjobPositions: position[] = [];

  isActiveSection:boolean= true;
  Filterjobs: Job[] = [];
  jobs : Job[] = [];

  closedJobs : ClosedJob[] = [];
  FilterClosedJobs : ClosedJob[] = [];

  filtersForm!: FormGroup;

  constructor(
    private spinnerService: SpinnerService,
    private jobService: JobService,
    private store: UserStoreService,
    private authService: AuthService,
    private closedJobService: ClosedJobServiceService,
    private fb : FormBuilder,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.store.getIdFromStore()
    .subscribe((val) => {
        let id = this.authService.getIdFromToken();
        this.employeeId = val || id;
    })

    this.filtersForm = this.fb.group({
      location: [''],
      jobType: [''],
      jobCategory: [''],
      jobPosition:[''],
    });

    this.loadJobs();
    this.loadClosedJobs();

    this.loadJobs();
    this.loadClosedJobs();

    this.locations.push({locationId: "null" , address: "Select Job Location " , city: "" , state: "" , country : ""});
    this.loadJobLocations();

    this.jobTypes.push({jobTypeId: "null" , typeName : " Select Job Type "});
    this.loadJobTypes();

    this.jobCategories.push({categoryId:"null",categoryCode:"Select Job Category ",categoryName:"",description:""})
    this.loadJobCategories();
    
    this.categoryjobPositions.push({positionId:"null",positionName:"Select Job Position ",positionCode:"",description:"",categoryId:"null"});
    this.loadJobPositions();
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
        this.Filterjobs = this.jobs;
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
        this.FilterClosedJobs = res.closedJobs;

        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    )
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

  public onSubmit() : void{
    if(this.isEmptyId(this.filtersForm.get('location')?.value) && this.isEmptyId(this.filtersForm.get('jobPosition')?.value) && this.isEmptyId(this.filtersForm.get('jobCategory')?.value) && this.isEmptyId(this.filtersForm.get('jobType')?.value) )
    {
      this.displayFilterEmptyToast();
      return;
    }
    
    this.filterJobs(this.filtersForm.get('jobPosition')?.value,this.filtersForm.get('location')?.value,this.filtersForm.get('jobType')?.value,this.filtersForm.get('jobCategory')?.value); 
  }
  
  public onSubmitForClosedJobs() : void{
    if(this.isEmptyId(this.filtersForm.get('location')?.value) && this.isEmptyId(this.filtersForm.get('jobPosition')?.value) && this.isEmptyId(this.filtersForm.get('jobCategory')?.value) && this.isEmptyId(this.filtersForm.get('jobType')?.value) )
    {
      this.displayFilterEmptyToast();
      return;
    }
    
    this.filterClosedJobs(this.filtersForm.get('jobPosition')?.value,this.filtersForm.get('location')?.value,this.filtersForm.get('jobType')?.value,this.filtersForm.get('jobCategory')?.value); 
  }

  private isEmptyId(id:string):boolean{
    return id==="null" || id==='';
  }

  private filterJobs(positionId: string , locationId : string , typeId : string , categoryId : string ) : void
  {
    this.Filterjobs = [];
    let typecheck: boolean = false;
    let positioncheck: boolean = false;
    let locationcheck: boolean = false;
    let categorycheck: boolean = false;

    if(!this.isEmptyId(positionId))
        positioncheck = true;
    if(!this.isEmptyId(locationId))
        locationcheck = true;
    if(!this.isEmptyId(categoryId))
        categorycheck = true;
    if(!this.isEmptyId(typeId))
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

  private filterClosedJobs(positionId: string , locationId : string , typeId : string , categoryId : string ) : void
  {
    this.FilterClosedJobs = [];
    let typecheck: boolean = false;
    let positioncheck: boolean = false;
    let locationcheck: boolean = false;
    let categorycheck: boolean = false;

    if(!this.isEmptyId(positionId))
        positioncheck = true;
    if(!this.isEmptyId(locationId))
        locationcheck = true;
    if(!this.isEmptyId(categoryId))
        categorycheck = true;
    if(!this.isEmptyId(typeId))
        typecheck = true;

    this.closedJobs.forEach((job) =>
      {      
        let flg:boolean  = true;
        if(positioncheck)
        {
          if(job.positionId.toString() != positionId)
              flg = false;
        }
        if(locationcheck)
        {
          if(job.locationId.toString() != locationId)
              flg = false;
        }
        if(typecheck)
        {
          if(job.jobTypeId.toString() != typeId)
              flg = false;
        }
        if(categorycheck)
        {
          if(job.categoryId.toString() != categoryId)
            flg = false;
        }
        
        if(flg)
        {
          this.FilterClosedJobs.push(job);
        }
      }

    );
    if(this.FilterClosedJobs.length>0)
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
    this.FilterClosedJobs = this.closedJobs;

    this.categoryjobPositions = [];
    this.categoryjobPositions.push({positionId:"null",positionName:"Select Job Position ",positionCode:"",description:"",categoryId:"null"});
 

    this.filtersForm = this.fb.group({
      location: [''],
      jobType: [''],
      jobCategory: [''],
      jobPosition:[''],
    });
    this.displayResetToast();
  }

  private displayResetToast(): void
  {
    this.toastr.success("Filters Reset Successfully !!");
  }
  
  private displayEmptyJobsToast(): void
  {
    this.toastr.error("No Jobs Found !!");
  }
  
  private displayJobsToast(): void
  {
    this.toastr.success("Jobs Found !!");
  }
  
  private displayFilterEmptyToast(): void
  {
    this.toastr.error("NO Filter Selected !!");
  }

  public activeJobTab():void{
      this.isActiveSection = true;
  }
  
  public closedJobTab():void{
      this.isActiveSection = true;
  }

  public loadJobPositionsByCategoryId():void
  {
    var selectedCategoryId  = this.filtersForm.get('jobCategory')?.value;
    this.categoryjobPositions = [];
    this.categoryjobPositions.push({positionId:"null",positionName:"Select Job Position ",positionCode:"",description:"",categoryId:"null"});
    
    this.jobPositions.forEach((pos) =>{
      if(selectedCategoryId===pos.categoryId)
        this.categoryjobPositions.push(pos);
    });
  }
}
