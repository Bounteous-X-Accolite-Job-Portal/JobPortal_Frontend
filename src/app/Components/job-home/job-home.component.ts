import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { JobCardComponent } from '../job-card/job-card.component';
import { JobService } from '../../Services/Job/job.service';
import { JobType } from '../../Models/JobTypeResponse/JobType';
import { JobCategory } from '../../Models/JobCategoryResponse/JobCategory';
import { location } from '../../Models/JoblocationResponse/location';
import { position } from '../../Models/JobPositionResponse/position';
import { Job } from '../../Models/JobResponse/Job';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Degree } from '../../Models/DegreeResponse/Degree';
import { ClosedJob } from '../../Models/ClosedJobResponse/ClosedJob';
import { ClosedJobServiceService } from '../../Services/ClosedJob/closed-job-service.service';
import { SpinnerService } from '../../Services/spinner.service';
import { AllClosedJobsResponse } from '../../Models/ClosedJobResponse/AllClosedJobsResponse';
import { UserStoreService } from '../../Services/user-store.service';
import { AuthService } from '../../Services/auth.service';

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

  public ActiveJobToggle: boolean = true;
  public FilterClosedJobToggle : boolean = false;

  locations: location[] = [];
  jobTypes: JobType[] = [];
  jobCategories: JobCategory[] = [];
  
  jobPositions: position[] =[];
  categoryjobPositions: position[] = [];

  degrees: Degree[] = [];
  jobs: Job[] = [];
  Filterjobs: Job[] = [];

  closedJobs : ClosedJob[] = [];
  filteredClosedJobs : ClosedJob[] = [];

  positionIndex: number = 0;
  typeIndex: number = 0;
  locationIndex: number = 0;
  categoryIndex: number = 0;
  degreeIndex :number = 0;

  isEmployee : boolean = false;
  hasPrivilege : boolean = false;
  isLoggedIn : boolean = false;
    
  constructor(
    private jobService: JobService , 
    private fb : FormBuilder,
    private closedJobService: ClosedJobServiceService,
    private spinnerService : SpinnerService,
    private store : UserStoreService,
    private authService : AuthService
  ) {
    this.checkUser();
    this.checkHasPrivilege();
  }

  filtersForm = this.fb.group({
    location: [''],
    jobType: [''],
    jobCategory: [''],
    jobPosition:[''],
    degree:['']
  });


  ngOnInit(): void {
    this.isEmployee = false;
    this.hasPrivilege = false;
    this.isLoggedIn = false;

    this.isLoggedIn = this.authService.isLoggedIn();

    if(this.isLoggedIn){
      this.checkUser();
      this.checkHasPrivilege();
    }

    this.loadJobs();
    if(this.hasPrivilege){
      this.loadClosedJobs();
    }

    this.locations.push({locationId: "null" , address: "Select Job Location " , city: "" , state: "" , country : ""});
    this.loadJobLocations();

    this.jobTypes.push({jobTypeId: "null" , typeName : " Select Job Type "});
    this.loadJobTypes();

    this.jobCategories.push({categoryId:"null",categoryCode:"Select Job Category ",categoryName:"",description:""})
    this.loadJobCategories();
    
    this.categoryjobPositions.push({positionId:"null",positionName:"Select Job Position ",positionCode:"",description:"",categoryId:"null"});
    this.loadJobPositions();

    this.degrees.push({degreeId:"null",degreeName:"Select Degree ",durationInYears:0});
    this.loadDegrees();
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

  ActiveJobs() {
    this.ActiveJobToggle = true;
    this.FilterClosedJobToggle = false;
  }

  ClosedJobs() {
    this.ActiveJobToggle = false;
    this.FilterClosedJobToggle = true;
  }

  loadClosedJobs(){
    this.spinnerService.showSpinner();

    this.closedJobService.getAllClosedJobs().subscribe(
      (data : AllClosedJobsResponse) => {
        console.log("closed jobs", data);

        this.closedJobs = data.closedJobs; 
        this.filteredClosedJobs = data.closedJobs;

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
        this.jobPositions = res.allJobPositions;
        console.log("all pos : ",this.jobPositions);
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
  
  addrefrral(jobId:string) {
    console.log("passed jobId ; ",jobId);
  //   this.jobService.jobId =jobId;
  //   console.log("serice job ; ",this.jobService.jobId);
  //  this.router.navigate(['employee-dashboard','addReferral']);
  }

  private loadDegrees(): void{
    this.jobService.getAllDegrees().subscribe(
      (res) => {
        this.degrees = this.degrees.concat(res.degrees);
        console.log(this.degrees);
      },
      (error) => {
        console.error('Error loading Degrees:',error);
      }
    )
  }
  public onSubmit() : void{
    if(this.categoryIndex==0 && this.locationIndex==0 && this.positionIndex==0 && this.typeIndex==0 && this.degreeIndex==0)
    {
      this.displayFilterEmptyToast();
      return;
    }

    console.log(this.jobPositions[this.positionIndex]);
    console.log(this.jobCategories[this.categoryIndex]);
    console.log(this.jobTypes[this.typeIndex]);
    console.log(this.locations[this.locationIndex]);
    console.log(this.degrees[this.degreeIndex]);
    
    this.filterJobs(this.jobPositions[this.positionIndex].positionId,this.locations[this.locationIndex].locationId,this.jobTypes[this.typeIndex].jobTypeId,this.jobCategories[this.categoryIndex].categoryId,this.degrees[this.degreeIndex].degreeId); 
  }

  public onSubmitForClosedJobs() : void{
    if(this.categoryIndex==0 && this.locationIndex==0 && this.positionIndex==0 && this.typeIndex==0 && this.degreeIndex==0)
    {
      this.displayFilterEmptyToast();
      return;
    }

    console.log(this.jobPositions[this.positionIndex]);
    console.log(this.jobCategories[this.categoryIndex]);
    console.log(this.jobTypes[this.typeIndex]);
    console.log(this.locations[this.locationIndex]);
    console.log(this.degrees[this.degreeIndex]);
    
    this.filterClosedJobs(this.jobPositions[this.positionIndex].positionId,this.locations[this.locationIndex].locationId,this.jobTypes[this.typeIndex].jobTypeId,this.jobCategories[this.categoryIndex].categoryId,this.degrees[this.degreeIndex].degreeId); 
  }

  private filterClosedJobs(positionId: string , locationId : string , typeId : string , categoryId : string , degreeId : string) : void
  {
    this.filteredClosedJobs = [];
    let typecheck: boolean = false;
    let positioncheck: boolean = false;
    let locationcheck: boolean = false;
    let categorycheck: boolean = false;
    let degreecheck: boolean = false;
    let filterOnClosedJob : boolean = false;

    if(positionId!="null")
        positioncheck = true;
    if(locationId!="null")
        locationcheck = true;
    if(categoryId!="null")
        categorycheck = true;
    if(typeId!="null")
        typecheck = true;
    if(degreeId!="null")
        degreecheck = true;

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
        if(degreecheck)
        {
          if(job.degreeId.toString() != degreeId)
            flg = false;
        }
        
        
        if(flg)
        {
          this.filteredClosedJobs.push(job);
        }
      }

    );
    if(this.filteredClosedJobs.length>0)
      this.displayJobsToast();
    else
    {
      this.displayEmptyJobsToast();
      this.resetFilters();
    }
  }

  private filterJobs(positionId: string , locationId : string , typeId : string , categoryId : string , degreeId : string) : void
  {
    this.Filterjobs = [];
    let typecheck: boolean = false;
    let positioncheck: boolean = false;
    let locationcheck: boolean = false;
    let categorycheck: boolean = false;
    let degreecheck: boolean = false;

    if(positionId!="null")
        positioncheck = true;
    if(locationId!="null")
        locationcheck = true;
    if(categoryId!="null")
        categorycheck = true;
    if(typeId!="null")
        typecheck = true;
    if(degreeId!="null")
        degreecheck = true;

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
        if(degreecheck)
        {
          if(job.degreeId != degreeId)
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
    this.filteredClosedJobs = this.closedJobs;
    this.categoryjobPositions = [];
    this.categoryjobPositions.push({positionId:"null",positionName:"Select Job Position ",positionCode:"",description:"",categoryId:"null"});

    this.categoryIndex =0;
    this.positionIndex =0;
    this.locationIndex =0;
    this.degreeIndex =0;
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
  
  private displayFilterEmptyToast(): void
  {
    this.toaster.error("NO Filter Selected !!");
  }

  public loadJobPositionsByCategoryId():void
  {
    var selectedCategoryId  = this.jobCategories[this.categoryIndex].categoryId;
    this.categoryjobPositions = [];
    this.categoryjobPositions.push({positionId:"null",positionName:"Select Job Position ",positionCode:"",description:"",categoryId:"null"});
    
    this.jobPositions.forEach((pos) =>{
      if(selectedCategoryId===pos.categoryId)
        this.categoryjobPositions.push(pos);
    });
  }
}
