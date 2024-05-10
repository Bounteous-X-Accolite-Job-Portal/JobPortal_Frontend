import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JobCategory } from '../../../Models/JobCategoryResponse/JobCategory';
import { JobService } from '../../../Services/job.service';
import { location } from '../../../Models/JoblocationResponse/location';
import { JobType } from '../../../Models/JobTypeResponse/JobType';
import { AddJobService } from '../../../Services/add-job.service';
import { position } from '../../../Models/JobPositionResponse/position';
import { Job } from '../../../Models/Job';
@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css',
})
export class AddJobComponent implements OnInit {
  jobForm!: FormGroup;
  isLoading: boolean = false;
  submitting = false;
  submitted = false;
  jobCategories: JobCategory[] = [];
  locations: location[] = [];
  jobTypes: JobType[] = [];
  jobPosition: position[] = [];
  data: Job[] = [];
  jobData: any;
  locationindex: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private addJobService: AddJobService
  ) {
    this.loadJobLocations();
    this.loadJobTypes();
    this.loadJobCategories();
    this.loadJobPositions();
  }

  ngOnInit(): void {
    this.jobForm = new FormGroup(
      {
        jobCode: new FormControl('', Validators.required),
        jobDescription: new FormControl('', Validators.required),
        jobTitle: new FormControl('', Validators.required),
        degreeId: new FormControl(''),
        categoryId: new FormControl(''),
        positionId: new FormControl(''),
        locationId: new FormControl(''),
        typeId: new FormControl(''),
        experience: new FormControl(''),
        lastDate: new FormControl(Date, Validators.required),
      }
      // {
      //   validators: this.lastDateValidator,
      // }
    );
  }

  // lastDateValidator = (): any => {
  //   const lastDateControls = this.jobForm.controls['lastdate'];
  //   const now = new Date();
  //   if (lastDateControls) {
  //     const lastDate = lastDateControls.value;
  //     if (
  //       lastDate.getDate() > now.getDate() ||
  //       lastDate.getTime() > lastDate.getTime()
  //     ) {
  //       lastDateControls.setErrors({ lastDateError: true });
  //       return { lastDateError: true };
  //     }
  //   } else {
  //     return null;
  //   }
  // };

  private loadJobLocations(): void {
    this.jobService.getAllJobLocations().subscribe(
      (res) => {
        this.locations = res.allJobLocations;
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
        this.jobCategories = res.allJobCategory;
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
        this.jobTypes = res.allJobTypes;
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
        this.jobPosition = res.allJobPositions;
        console.log(this.jobPosition);
      },
      (error) => {
        console.error('Error loading job types:', error);
      }
    );
  }

  get f() {
    return this.jobForm.controls;
  }

  onSubmit() {
   
    console.log(this.locations[this.locationindex]);
    
    console.log(this.jobForm.controls['']);
    this.jobData = {
      jobCode: this.jobForm.value.jobCode,
      jobDescription: this.jobForm.value.jobDescription,
      jobTitle: this.jobForm.value.jobTitle,
      degreeId: this.jobForm.value.degreeId,
      categoryId: this.jobForm.value.categoryId,
      positionId: this.jobForm.value.positionId,
      locationId: this.jobForm.value.locationId,
      typeId: this.jobForm.value.typeId,
      experience: this.jobForm.value.experience,
      lastDate: this.jobForm.value.lastDate,
    };
    console.log(this.jobData.categoryId + this.jobData.lastDate);
    this.addJobService.addJobs(this.jobData).subscribe(
      (res) => {
        console.log('success ' + res);
      },
      (error) => {
        console.error('Error submission:', error);
      }
    );

    // }
    // else{
    //   console.log("invalid form");
    // }
    this.submitted = true;
  }
}
