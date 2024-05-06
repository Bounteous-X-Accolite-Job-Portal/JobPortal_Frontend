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
import { threadId } from 'worker_threads';
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

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private addJobService: AddJobService
  ) {}

  ngOnInit(): void {
    this.jobForm = this.formBuilder.group({
      jobCode: ['', Validators.required],
      jobDescription: ['', Validators.required],
      jobTitle: ['', [Validators.required]],
      degree: [''],
      jobCategory: [''],
      jobPosition: [''],
      jobLocation: [''],
      jobType: [''],
      experience: [''],
      lastDate: [new Date(), Validators.required],
    });

      this.jobService
    .getAllJobPosition()
    .subscribe((positions) => (this.jobPosition = positions.allJobPositions));
    this.jobService
      .getAllJobLocations()
      .subscribe((locations) => (this.locations = locations.allJobLocations));
    this.jobService
      .getAllJobTypes()
      .subscribe((types) => (this.jobTypes = types.allJobTypes));
    this.jobService
      .getAllJobCategories()
      .subscribe(
        (categories) => (this.jobCategories = categories.allJobCategory)
      )
    // {
    //   validators: this.lastDateValidator,
    // }

    // this.loadJobLocations();
    // this.loadJobTypes();
    // this.loadJobCategories();
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

  // private loadJobLocations(): void {
  //   this.jobService.getAllJobLocations().subscribe(
  //     (res) => {
  //       this.locations = res.allJobLocations;
  //       console.log(this.locations);
  //     },
  //     (error) => {
  //       console.error('Error loading job locations:', error);
  //     }
  //   );
  // }

  // private loadJobCategories(): void {
  //   this.jobService.getAllJobCategories().subscribe(
  //     (res) => {
  //       this.jobCategories = res.allJobCategory;
  //       console.log(this.jobCategories);
  //       this.isLoading = false;
  //     },
  //     (error) => {
  //       console.error('Error loading job locations:', error);
  //     }
  //   );
  // }

  // private loadJobTypes(): void {
  //   this.jobService.getAllJobTypes().subscribe(
  //     (res) => {
  //       this.jobTypes = res.allJobTypes;
  //       console.log(this.jobTypes);
  //     },
  //     (error) => {
  //       console.error('Error loading job types:', error);
  //     }
  //   );
  // }

  get f() {
    return this.jobForm.controls;
  }

  onSubmit() {
    // if (this.jobForm.valid) {
    this.jobData = {
      jobCode: "this.f['jobCode'].value",
      jobDescription: "this.f['jobDescription'].value",
      jobTitle: "this.f['jobTitle'].value,",
      degreeId: 'Df',
      categoryId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      positionId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      locationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      typeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      experience: 'df',
      lastDate: '2024-05-06T01:02:01.547Z',
    };
    console.log('hi' + this.jobData);
    this.addJobService.addJobs(this.jobData).subscribe(
      (res) => {
        console.log('success' + res);
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
