import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, NgModule, OnInit, inject } from '@angular/core';
import { JobCardComponent } from '../job-card/job-card.component';
import { JobService } from '../../Services/Job/job.service';
import { JobType } from '../../Models/JobTypeResponse/JobType';
import { JobCategory } from '../../Models/JobCategoryResponse/JobCategory';
import { location } from '../../Models/JoblocationResponse/location';
import { position } from '../../Models/JobPositionResponse/position';
import { Job } from '../../Models/JobResponse/Job';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
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
  imports: [CommonModule, JobCardComponent, ReactiveFormsModule, ToastrModule, FormsModule],
  styleUrls: ['./job-home.component.css'],
  moduleId: module.id,
})
export class JobHomeComponent {
  toaster = inject(ToastrService);

  public ActiveJobToggle: boolean = true;
  public FilterClosedJobToggle: boolean = false;

  locations: location[] = [];
  jobTypes: JobType[] = [];
  jobCategories: JobCategory[] = [];

  jobPositions: position[] = [];
  categoryjobPositions: position[] = [];

  degrees: Degree[] = [];
  jobs: Job[] = [];
  Filterjobs: Job[] = [];

  closedJobs: ClosedJob[] = [];
  filteredClosedJobs: ClosedJob[] = [];
  searchJobs: Job[] = [];

  filtersForm !: FormGroup;

  isEmployee: boolean = false;
  hasPrivilege: boolean = false;
  isLoggedIn: boolean = false;
  searchText: string ='';

  constructor(
    private jobService: JobService,
    private fb: FormBuilder,
    private closedJobService: ClosedJobServiceService,
    private spinnerService: SpinnerService,
    private store: UserStoreService,
    private authService: AuthService,
    private elementRef: ElementRef
  ) {
    this.checkUser();
    this.checkHasPrivilege();
  }

  ngOnInit(): void {
    this.isEmployee = false;
    this.hasPrivilege = false;
    this.isLoggedIn = false;

    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.checkUser();
      this.checkHasPrivilege();
    }

    this.filtersForm = this.fb.group({
      location: [''],
      jobType: [''],
      jobCategory: [''],
      jobPosition: [''],
      degree: [''],
    });

    this.loadJobs();
    if(this.hasPrivilege){
      this.loadClosedJobs();
    }

    this.loadJobLocations();
    this.loadJobTypes();
    this.loadJobCategories();
    this.loadJobPositions();
    this.loadDegrees();
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

  ActiveJobs() {
    this.ActiveJobToggle = true;
    this.FilterClosedJobToggle = false;
  }

  ClosedJobs() {
    this.ActiveJobToggle = false;
    this.FilterClosedJobToggle = true;
  }

  loadClosedJobs() {
    this.spinnerService.showSpinner();

    this.closedJobService.getAllClosedJobs().subscribe(
      (data: AllClosedJobsResponse) => {
        // console.log('closed jobs', data);

        this.closedJobs = data.closedJobs;
        this.filteredClosedJobs = data.closedJobs;

        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  private loadJobLocations(): void {
    this.spinnerService.showSpinner();
    this.jobService.getAllJobLocations().subscribe(
      (res) => {
        this.locations = res.allJobLocations;
        this.spinnerService.hideSpinner();
      },
      (error) => {
        this.spinnerService.hideSpinner();
        console.error('Error loading job locations:', error);
      }
    );
  }

  private loadJobTypes(): void {
    this.spinnerService.showSpinner();
    this.jobService.getAllJobTypes().subscribe(
      (res) => {
        this.jobTypes = res.allJobTypes;
        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.error('Error loading job types:', error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  private loadJobCategories(): void {
    this.spinnerService.showSpinner();
    this.jobService.getAllJobCategories().subscribe(
      (res) => {
        this.jobCategories = res.allJobCategory;
        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.error('Error loading job categories:', error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  private loadJobPositions(): void {
    this.spinnerService.showSpinner();
    this.jobService.getAllJobPosition().subscribe(
      (res) => {
        this.jobPositions = res.allJobPositions;
        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.error('Error loading job Positions:', error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  private loadJobs(): void {
    this.spinnerService.showSpinner();
    this.jobService.getAllJobs().subscribe(
      (res) => {
        this.jobs = res.allJobs;
        this.Filterjobs = this.jobs;
        this.searchJobs= this.jobs;
        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.error('Error loading Jobs', error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  private loadDegrees(): void {
    this.spinnerService.showSpinner();
    this.jobService.getAllDegrees().subscribe(
      (res) => {
        this.degrees = res.degrees;
        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.error('Error loading Degrees:', error);
        this.spinnerService.hideSpinner();
      }
    );
  }
  public onSubmit(): void {
    if (
      this.isEmptyId(this.filtersForm.get('location')?.value) &&
      this.isEmptyId(this.filtersForm.get('jobPosition')?.value) &&
      this.isEmptyId(this.filtersForm.get('jobCategory')?.value) &&
      this.isEmptyId(this.filtersForm.get('jobType')?.value) &&
      this.isEmptyId(this.filtersForm.get('degree')?.value)
    ) {
      this.displayFilterEmptyToast();
      return;
    }

    this.filterJobs(
      this.filtersForm.get('jobPosition')?.value,
      this.filtersForm.get('location')?.value,
      this.filtersForm.get('jobType')?.value,
      this.filtersForm.get('jobCategory')?.value,
      this.filtersForm.get('degree')?.value
    );

  }

  private isEmptyId(id: string): boolean {
    return id === 'null' || id === '';
  }

  public onSubmitForClosedJobs(): void {
    if (
      this.isEmptyId(this.filtersForm.get('location')?.value) &&
      this.isEmptyId(this.filtersForm.get('jobPosition')?.value) &&
      this.isEmptyId(this.filtersForm.get('jobCategory')?.value) &&
      this.isEmptyId(this.filtersForm.get('jobType')?.value) &&
      this.isEmptyId(this.filtersForm.get('degree')?.value)
    ) {
      this.displayFilterEmptyToast();
      return;
    }

    this.filterClosedJobs(
      this.filtersForm.get('jobPosition')?.value,
      this.filtersForm.get('location')?.value,
      this.filtersForm.get('jobType')?.value,
      this.filtersForm.get('jobCategory')?.value,
      this.filtersForm.get('degree')?.value
    );    
  }

  private filterClosedJobs(
    positionId: string,
    locationId: string,
    typeId: string,
    categoryId: string,
    degreeId: string
  ): void {
    this.filteredClosedJobs = [];
    let typecheck: boolean = false;
    let positioncheck: boolean = false;
    let locationcheck: boolean = false;
    let categorycheck: boolean = false;
    let degreecheck: boolean = false;

    if (!this.isEmptyId(positionId)) positioncheck = true;
    if (!this.isEmptyId(locationId)) locationcheck = true;
    if (!this.isEmptyId(categoryId)) categorycheck = true;
    if (!this.isEmptyId(typeId)) typecheck = true;
    if (!this.isEmptyId(degreeId)) degreecheck = true;

    this.closedJobs.forEach((job) => {
      let flg: boolean = true;
      if (positioncheck) {
        if (job.positionId.toString() != positionId) flg = false;
      }
      if (locationcheck) {
        if (job.locationId.toString() != locationId) flg = false;
      }
      if (typecheck) {
        if (job.jobTypeId.toString() != typeId) flg = false;
      }
      if (categorycheck) {
        if (job.categoryId.toString() != categoryId) flg = false;
      }
      if (degreecheck) {
        if (job.degreeId.toString() != degreeId) flg = false;
      }

      if (flg) {
        this.filteredClosedJobs.push(job);
      }
    });
    if (this.filteredClosedJobs.length > 0) this.displayJobsToast();
    else {
      this.displayEmptyJobsToast();
      this.resetFilters();
    }
  }

  private filterJobs(
    positionId: string,
    locationId: string,
    typeId: string,
    categoryId: string,
    degreeId: string
  ): void {
    this.Filterjobs = [];
    let typecheck: boolean = false;
    let positioncheck: boolean = false;
    let locationcheck: boolean = false;
    let categorycheck: boolean = false;
    let degreecheck: boolean = false;

    if (!this.isEmptyId(positionId)) positioncheck = true;
    if (!this.isEmptyId(locationId)) locationcheck = true;
    if (!this.isEmptyId(categoryId)) categorycheck = true;
    if (!this.isEmptyId(typeId)) typecheck = true;
    if (!this.isEmptyId(degreeId)) degreecheck = true;

    this.jobs.forEach((job) => {
      let flg: boolean = true;
      if (positioncheck) {
        if (job.positionId != positionId) flg = false;
      }
      if (locationcheck) {
        if (job.locationId != locationId) flg = false;
      }
      if (typecheck) {
        if (job.jobType != typeId) flg = false;
      }
      if (categorycheck) {
        if (job.categoryId != categoryId) flg = false;
      }
      if (degreecheck) {
        if (job.degreeId != degreeId) flg = false;
      }

      if (flg) {
        this.Filterjobs.push(job);
      }
    });
    if (this.Filterjobs.length > 0){
      this.displayJobsToast();
      this.searchJobs = this.Filterjobs;
    }
    else {
      this.displayEmptyJobsToast();
      this.resetFilters();
    }
  }

  public resetFilters(): void {
    this.Filterjobs = this.jobs;
    this.searchJobs = this.jobs;
    this.filteredClosedJobs = this.closedJobs;
    this.categoryjobPositions = [];

    this.filtersForm = this.fb.group({
      location: [''],
      jobType: [''],
      jobCategory: [''],
      jobPosition: [''],
      degree: [''],
    });

    this.displayResetToast();
  }

  search(searchText: string) {
    // if (!this.searchText) return;

    this.spinnerService.showSpinner();

    if (!searchText || !searchText.trim()) {
      this.searchJobs = this.jobs.slice();
      this.spinnerService.hideSpinner();
      return;
    }
    
    // this.searchJobs = [];
    searchText = searchText.trim().toLowerCase(); 
    
    this.searchJobs = this.Filterjobs.filter((item) => {
      const jobTitle = item.jobTitle.toLowerCase().includes(searchText.toLowerCase());
    //  console.log(jobTitle);
      const jobCode = item.jobCode.toLowerCase().includes(searchText.toLowerCase());
      
      return jobTitle || jobCode;
    });
    
   // console.log(this.searchJobs);
    // console.log('Filtered applicants:', this.showApplicants);
    this.spinnerService.hideSpinner();
  }


  private displayResetToast(): void {
    this.toaster.success('Filters Reset Successfully !!');
  }

  private displayEmptyJobsToast(): void {
    this.toaster.info('No Jobs Found !!');
  }

  private displayJobsToast(): void {
    this.toaster.success('Jobs Found !!');
  }

  private displayFilterEmptyToast(): void {
    this.toaster.info('No filter Selected !!');
  }

  public loadJobPositionsByCategoryId(): void {
    var selectedCategoryId = this.filtersForm.get('jobCategory')?.value;
    this.categoryjobPositions = [];
    
    this.jobPositions.forEach((pos) => {
      if (selectedCategoryId === pos.categoryId)
        this.categoryjobPositions.push(pos);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const close = this.elementRef.nativeElement.querySelector('.btn-close');
    const specificWidth = 768; 
    const windowWidth = window.innerWidth;

    if ( close && windowWidth >= specificWidth) {
      close.click();
    }
  }

}
