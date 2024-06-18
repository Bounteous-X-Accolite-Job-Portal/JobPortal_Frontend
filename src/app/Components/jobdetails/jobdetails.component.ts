import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Job } from '../../Models/JobResponse/Job';
import { location } from '../../Models/JoblocationResponse/location';
import { Degree } from '../../Models/DegreeResponse/Degree';
import { JobType } from '../../Models/JobTypeResponse/JobType';
import { JobCategory } from '../../Models/JobCategoryResponse/JobCategory';
import { position } from '../../Models/JobPositionResponse/position';
import { DegreeResponse } from '../../Models/DegreeResponse/DegreeRespose';
import { JobCategoryResponse } from '../../Models/JobCategoryResponse/JobCategoryResponse';
import { JobTypeResponse } from '../../Models/JobTypeResponse/JobTypeResponse';
import { JobLocationResponse } from '../../Models/JoblocationResponse/JobLocationResponse';
import { JobPositionResponse } from '../../Models/JobPositionResponse/JobPositionResponse';
import { Router } from '@angular/router';
import { UserStoreService } from '../../Services/user-store.service';
import { AuthService } from '../../Services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { JobService } from '../../Services/Job/job.service';
import { SpinnerService } from '../../Services/spinner.service';
import { ClosedJob } from '../../Models/ClosedJobResponse/ClosedJob';
import { ClosedJobServiceService } from '../../Services/ClosedJob/closed-job-service.service';

@Component({
  selector: 'app-jobdetails',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ToastrModule, RouterLink],
  templateUrl: './jobdetails.component.html',
  styleUrl: './jobdetails.component.css'
})
export class JobdetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  toaster = inject(ToastrService);  

  jobId !: string;
  closedJobId !: string;

  job?: Job;
  closedJob ?: ClosedJob;

  location?: location ;
  degree?: Degree;
  jobtype?: JobType;
  jobcategory?: JobCategory;
  jobPosition?: position ;

  logginnedUserId : string = '';
  userapplied :boolean = false;
  stringForButton:string = 'Apply';
  isEmployee:boolean = false;
  
  isLoggedIn : boolean = false;

  constructor(
    private jobService : JobService,
    private router : Router , 
    private userStore : UserStoreService,
    private auth : AuthService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private spinnerService : SpinnerService,
    private closedJobService : ClosedJobServiceService
  ) {}

  ngOnInit(){
    this.userapplied = false;
    this.getJobId();
    this.getClosedJobId();

    this.isLoggedIn = this.auth.isLoggedIn();

    this.userStore.getIdFromStore()
        .subscribe((val) => {
            // console.log(val);
            let idFromToken = this.auth.getIdFromToken();
            // console.log(idFromToken);
            this.logginnedUserId = val || idFromToken;
            // console.log("Logged User Id : ",this.logginnedUserId);
        })

    this.loadJobDetails();
  }

  private rectifyDate(): void {
    this.spinnerService.showSpinner();

    if (this.job !== undefined) {
      let date = this.job.lastDate.split('T');
      let postDate = this.job.postDate.split('T');
      this.job.lastDate = date[0];
      this.job.postDate = postDate[0];  
    }
    if (this.closedJob !== undefined) {
      let date = this.closedJob.lastDate.split('T');
      this.closedJob.lastDate = date[0];
    }

    this.spinnerService.hideSpinner();
  }

  getJobId() {
    this.spinnerService.showSpinner();

    this.route.params.subscribe((params) => {
      this.jobId = params['jobId']; // Access the 'id' parameter from the URL
      // console.log('Job ID:', this.jobId);

      this.spinnerService.hideSpinner();
    });
  }

  getClosedJobId() {
    this.spinnerService.showSpinner();

    this.route.params.subscribe((params) => {
      this.closedJobId = params['closedJobId']; // Access the 'id' parameter from the URL
      // console.log('Closed Job ID:', this.closedJobId);

      this.spinnerService.hideSpinner();
    });
  }
  
  private loadJobDetails(): void{
    this.spinnerService.showSpinner();

    if (this.jobId !== undefined){
      this.jobService.getJobById(this.jobId).subscribe(event => {
        this.job = event.job;

        this.loadLocationDetails(event.job.locationId);
        this.loadPositionDetails(event.job.positionId);
        this.loadCategoryDetails(event.job.categoryId);
        this.loadDegreeDetails(event.job.degreeId);
        this.loadTypeDetails(event.job.jobType);
        
        if(this.isLoggedIn){
          this.loadcheckCandidateApplicable();
        }

        this.rectifyDate();
        
        this.spinnerService.hideSpinner();
      });
    }
    else{
      this.closedJobService.getClosedJobById(this.closedJobId).subscribe(
        event => {
          // console.log("closed job - ", event.closedJob);
          this.closedJob = event.closedJob;

          this.loadLocationDetails(event.closedJob.locationId.toString());
          this.loadPositionDetails(event.closedJob.positionId.toString());
          this.loadCategoryDetails(event.closedJob.categoryId.toString());
          this.loadDegreeDetails(event.closedJob.degreeId.toString());
          this.loadTypeDetails(event.closedJob.jobTypeId.toString());

          this.spinnerService.hideSpinner();
        }
      );
    }
  }

  private loadLocationDetails(locationId : string) : void{
    this.spinnerService.showSpinner();

    this.jobService.getLocationById(locationId).subscribe(
      (loc: JobLocationResponse) => {
        this.location = loc.jobLocation;
        // console.log(loc);
        this.spinnerService.hideSpinner();
      },
      (error) =>{
        console.error(error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  private loadPositionDetails(positionId : string): void{
    this.spinnerService.showSpinner();

    this.jobService.getPositionById(positionId).subscribe(
      (pos: JobPositionResponse) => {
        this.jobPosition = pos.jobPosition;
        // console.log(pos);
        this.spinnerService.hideSpinner();
      },
      (error) =>{
        console.error(error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  private loadCategoryDetails(categoryId : string): void{
    this.spinnerService.showSpinner();

    this.jobService.getCategoryById(categoryId).subscribe(
      (cat : JobCategoryResponse) => {
        this.jobcategory = cat.jobCategory;
        // console.log("cat  :"+cat.jobCategory);
        this.spinnerService.hideSpinner();
      },
      (error) =>{
        console.error(error);
        this.spinnerService.hideSpinner();
      }
    );
  }
    
  private loadDegreeDetails(degreeId : string): void{
    this.spinnerService.showSpinner();

    this.jobService.getDegreeById(degreeId).subscribe(
      (deg : DegreeResponse) => {
        this.degree = deg.degree;
        // console.log("deg : "+deg);
        this.spinnerService.hideSpinner();
      },
      (error) =>{
        console.error(error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  private loadTypeDetails(typeId : string) : void{
    this.spinnerService.showSpinner();

    this.jobService.getJobTypeById(typeId).subscribe(
    (typ: JobTypeResponse) => {
      this.jobtype = typ.jobType;
      // console.log(this.jobtype);
      this.spinnerService.hideSpinner();
    },
    (error) =>{
      console.error(error);
      this.spinnerService.hideSpinner();
    }
  );
  }

  public applynow(jobId?:string):void
  {
    this.spinnerService.showSpinner();

    if(!this.isLoggedIn){
      this.toaster.info("Please login to apply !");

      this.spinnerService.hideSpinner();
      this.router.navigate(["/login"]);
      return;
    }
    else{
      this.jobService.applyForJob(jobId).subscribe(
        (res) =>
          {
            this.stringForButton = "Already Applied !";
            this.disableApplyButton();
            this.displayAppliedMessage();
            // console.log("Success",res);

            this.spinnerService.hideSpinner();
            this.router.navigate(['jobs']);
          },
        (error) =>
          {
            this.displayNotAppliedMessage();
            console.error("Error",error);
            this.spinnerService.hideSpinner();
          }
      )
    }
  }

  private loadcheckCandidateApplicable():void{
    this.spinnerService.showSpinner();

    this.jobService.checkCandidateApplicable(this.job?.jobId).subscribe(
      (res) =>{
          // console.log(res);
          var status = res.status;
          // console.log("rece : ",status);
          if(status=="400")
          {
            this.stringForButton = "Employee Logged In !!";
            this.isEmployee = true;
          }
          else if(status=="401")
          {
            this.stringForButton = "Not Logged In !!";
            this.disableApplyButton();
          }
          else if(status=="403")
          {
            this.stringForButton = "Already Applied !";
            this.disableApplyButton();
          }
          else if(status=="200")
          {
            this.stringForButton = "Apply Now";
            this.enableApplyButton();
          }

          // console.log(">>>button : ",this.stringForButton);
          this.spinnerService.hideSpinner();
      },
      (error) =>
        {
          console.log(error);
          this.spinnerService.hideSpinner();
        }
    )
  }

  private disableApplyButton():void
  {
    this.renderer.setProperty(this.elementRef.nativeElement.querySelector('button'), 'disabled', true);
  }
  
  private enableApplyButton():void
  {
    this.renderer.setProperty(this.elementRef.nativeElement.querySelector('button'), 'disabled', false);
  }

  private displayAppliedMessage(): void
  {
    this.toaster.success("Successfully Applied !!");
  }
  
  private displayNotAppliedMessage(): void
  {
    this.toaster.success("Error in Application !!");
  }

  public getName(val:boolean):string
  {
    return val?"Already Applied":"Apply Now";
  }

  public Refer(jobId?:string):void{
    this.router.navigate(['employee-dashboard','addReferral',jobId]);
  }
}