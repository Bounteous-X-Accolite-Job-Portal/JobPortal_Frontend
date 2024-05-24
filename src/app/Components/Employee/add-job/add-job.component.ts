import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';
import { AbstractControl,FormControl,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { JobCategory } from '../../../Models/JobCategoryResponse/JobCategory';
import { JobService } from '../../../Services/Job/job.service';
import { location } from '../../../Models/JoblocationResponse/location';
import { JobType } from '../../../Models/JobTypeResponse/JobType';
import { AddJobService } from '../../../Services/Job/add-job.service';
import { position } from '../../../Models/JobPositionResponse/position';
import { Degree } from '../../../Models/DegreeResponse/Degree';
import { Job } from '../../../Models/JobResponse/Job';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { SpinnerService } from '../../../Services/spinner.service';
import { timestamp } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css',
  providers: [DatePipe]
})
export class AddJobComponent implements OnInit {
  jobForm!: FormGroup;
  isLoading: boolean = false;
  submitting = false;
  submitted = false;

  locations: location[] = [];
  jobTypes: JobType[] = [];
  jobCategories: JobCategory[] = [];

  jobPositions: position[] = [];
  categoryjobPositions: position[] = [];

  degrees: Degree[] = [];
  jobs: Job[] = [];
  jobData: any;
  lastDateError: boolean = true;

  constructor(
    private jobService: JobService,
    private addJobService: AddJobService,
    private toastr: ToastrService
  ) {
   
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

  ngOnInit(): void {
    console.log(this.lastDateError);
    this.jobForm = new FormGroup(
      {
        jobCode: new FormControl('', Validators.required),
        jobDescription: new FormControl('', Validators.required),
        jobTitle: new FormControl('', Validators.required),
        degreeId: new FormControl(''),
        categoryId: new FormControl(''),
        positionId: new FormControl(''),
        locationId: new FormControl(''),
        jobType: new FormControl(''),
        experience: new FormControl(''),
        lastDate: new FormControl('', Validators.required),
      },
    );
  }


  private loadJobLocations(): void {
    this.jobService.getAllJobLocations().subscribe(
      (res) => {
        this.locations= this.locations.concat(res.allJobLocations);
        console.log(this.locations);
      },
      (error) => {
        console.error('Error loading job locations:', error);
      }
    );
  }

  private loadJobCategories(): void {
    this.jobService.getAllJobCategories().subscribe(
      (res) => {
        this.jobCategories = this.jobCategories.concat(res.allJobCategory);
        console.log(this.jobCategories);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading job locations:', error);
      }
    );
  }

  private loadJobTypes(): void {
    this.jobService.getAllJobTypes().subscribe(
      (res) => {
        this.jobTypes = this.jobTypes.concat(res.allJobTypes);
        console.log(this.jobTypes);
      },
      (error) => {
        console.error('Error loading job types:', error);
      }
    );
  }
  private loadJobPositions(): void {
    this.jobService.getAllJobPosition().subscribe(
      (res) => {
        this.jobPositions = res.allJobPositions;
        console.log(this.jobPositions);
      },
      (error) => {
        console.error('Error loading job types:', error);
      }
    );
  }

  private loadDegrees(): void {
    this.jobService.getAllDegrees().subscribe(
      (res) => {
        this.degrees = this.degrees.concat(res.degrees);
        console.log(this.degrees);
      },
      (error) => {
        console.error('Error loading Degrees:', error);
      }
    );
  }

  get f() {
    return this.jobForm.controls;
  }

  onSubmit() {
    console.log(this.jobForm.value);
    this.jobData = {
      jobCode: this.jobForm.value.jobCode,
      jobDescription: this.jobForm.value.jobDescription,
      jobTitle: this.jobForm.value.jobTitle,
      degreeId: this.jobForm.value.degreeId,
      categoryId: this.jobForm.value.categoryId,
      positionId: this.jobForm.value.positionId,
      locationId: this.jobForm.value.locationId,
      jobType: this.jobForm.value.jobType,
      experience: this.jobForm.value.experience,
      lastDate: this.jobForm.value.lastDate,
    };
    let given = this.jobForm.value.lastDate;
    if (this.jobForm.valid) {
     

      console.log(this.jobForm.value.lastDate, " ", new Date());
      this.addJobService.addJobs(this.jobData).subscribe(
        (res) => {
          console.log('success ', res);
          this.toastr.success("Job Posted Successfully !!");
        },
        (error) => {
          console.error('Error submission:', error);
        }
      );
    } else {
      console.log('invalid form');
    }
    this.submitted = true;
  }

  public loadJobPositionsByCategoryId():void
  {
    var selectedCategoryId  = this.jobForm.value.categoryId;
    this.categoryjobPositions = [];
    this.categoryjobPositions.push({positionId:"null",positionName:"Select Job Position ",positionCode:"",description:"",categoryId:"null"});
    
    this.jobPositions.forEach((pos) =>{
      if(selectedCategoryId===pos.categoryId)
        this.categoryjobPositions.push(pos);
    });
  }
}
