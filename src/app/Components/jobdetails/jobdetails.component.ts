import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from '../../Models/JobResponse/Job';
import { location } from '../../Models/JoblocationResponse/location';
import { Degree } from '../../Models/DegreeResponse/Degree';
import { JobType } from '../../Models/JobTypeResponse/JobType';
import { JobCategory } from '../../Models/JobCategoryResponse/JobCategory';
import { position } from '../../Models/JobPositionResponse/position';
import { AllJobPosition } from '../../Models/JobPositionResponse/AllJobPosition';
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

@Component({
  selector: 'app-jobdetails',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ToastrModule],
  templateUrl: './jobdetails.component.html',
  styleUrl: './jobdetails.component.css'
})
export class JobdetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  toaster = inject(ToastrService);  
  job?: Job;
  location?: location ;
  degree?: Degree;
  jobtype?: JobType;
  jobcategory?: JobCategory;
  jobPosition?: position ;
  logginnedUserId : string = '';
  userapplied :boolean = false;
  stringForButton:string = '';
  canApply:boolean = false;

  constructor(
    private jobService : JobService,
    private router : Router , 
    private userStore : UserStoreService,
    private auth : AuthService,
    private renderer: Renderer2,
    private elementRef: ElementRef) {}

  ngOnInit():void
  {
    this.userapplied = false;
    this.loadJobDetails();
    this.userStore.getIdFromStore()
        .subscribe((val) => {
            console.log(val);
            let idFromToken = this.auth.getIdFromToken();
            console.log(idFromToken);
            this.logginnedUserId = val || idFromToken;
            console.log("Logged User Id : ",this.logginnedUserId);
        })
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
      
      this.loadcheckCandidateApplicable();
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

  public applynow(jobId?:string):void
  {
    this.jobService.applyForJob(jobId).subscribe(
      (res) =>
        {
          this.stringForButton = "Already Applied !";
          this.disableApplyButton();
          this.displayAppliedMessage();
          console.log("Success",res);
          this.router.navigate(['jobs']);
        },
      (error) =>
        {
          this.displayNotAppliedMessage();
          console.log("Error",error);
        }
    )
  }

  private loadcheckCandidateApplicable():void{
    this.jobService.checkCandidateApplicable(this.job?.jobId).subscribe(
      (res) =>{
        console.log(res);
        var status = res.status;
        console.log("rece : ",status);
          if(status=="400")
          {
            this.stringForButton = "Employee Logged In !!";
            this.disableApplyButton();
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

          console.log(">>>button : ",this.stringForButton);
      },
      (error) =>
        {
          console.log(error);
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
}
