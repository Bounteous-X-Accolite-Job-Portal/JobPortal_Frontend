import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent, ToastrModule],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css',
  providers: [DatePipe]
})
export class AddJobComponent implements OnInit {
  jobForm!: FormGroup;

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
    private toast: ToastrService,
    private spinnerService: SpinnerService,
  ) {
    this.loadJobLocations();
    this.loadJobTypes();
    this.loadJobCategories();
    this.loadJobPositions();
    this.loadDegrees();
  }

  ngOnInit(): void {
    console.log(this.lastDateError);
    this.jobForm = new FormGroup(
      {
        jobCode: new FormControl('', Validators.required),
        jobDescription: new FormControl('', Validators.required),
        jobTitle: new FormControl('', Validators.required),
        degreeId: new FormControl('', Validators.required),
        categoryId: new FormControl('', Validators.required),
        positionId: new FormControl('', Validators.required),
        locationId: new FormControl('', Validators.required),
        jobType: new FormControl('', Validators.required),
        experience: new FormControl('', Validators.required),
        lastDate: new FormControl('', Validators.required),
      },
    );
  }

  private loadJobLocations(): void {
    this.spinnerService.showSpinner();

    this.jobService.getAllJobLocations().subscribe(
      (res) => {
        this.locations= this.locations.concat(res.allJobLocations);
        console.log(this.locations);
        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.error('Error loading job locations:', error);
        this.spinnerService.hideSpinner();
      }
    );
  }
  private loadJobCategories(): void {
    this.spinnerService.showSpinner();

    this.jobService.getAllJobCategories().subscribe(
      (res) => {
        this.jobCategories = this.jobCategories.concat(res.allJobCategory);
        console.log(this.jobCategories);
        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.error('Error loading job locations:', error);
        this.spinnerService.hideSpinner();
      }
    );
  }
  private loadJobTypes(): void {
    this.spinnerService.showSpinner();

    this.jobService.getAllJobTypes().subscribe(
      (res) => {
        this.jobTypes = this.jobTypes.concat(res.allJobTypes);
        console.log(this.jobTypes);
        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.error('Error loading job types:', error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  private loadJobPositions(): void {
    this.spinnerService.showSpinner();

    this.jobService.getAllJobPosition().subscribe(
      (res) => {
        this.jobPositions = res.allJobPositions;
        console.log(this.jobPositions);
        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.error('Error loading job types:', error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  private loadDegrees(): void {
    this.spinnerService.showSpinner();

    this.jobService.getAllDegrees().subscribe(
      (res) => {
        this.degrees = this.degrees.concat(res.degrees);
        console.log(this.degrees);
        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.error('Error loading Degrees:', error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  get f() {
    return this.jobForm.controls;
  }

  onSubmit() {
    this.spinnerService.showSpinner();
    this.submitted = true;

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

    if (this.jobForm.valid) {
      console.log(this.jobForm.value.lastDate, " ", new Date());

      this.addJobService.addJobs(this.jobData).subscribe(
        (res) => {
          console.log('success ', res);
          this.toast.success("Job Posted Successfully !!");
          this.jobForm.reset();
          this.spinnerService.hideSpinner();
          this.submitted = false;
        },
        (error) => {
          console.error('Error submission:', error);
          this.toast.error("Error while job posting" + error.message);
          this.spinnerService.hideSpinner();
        }
      );

    } else {
      console.log('invalid form');
      this.toast.error("invalid form, please fill all the details !");
      this.spinnerService.hideSpinner();
    }
  }

  public loadJobPositionsByCategoryId(){
    this.spinnerService.showSpinner();

    var selectedCategoryId  = this.jobForm.value.categoryId;
    this.categoryjobPositions = [];

    this.jobPositions.forEach((pos) =>{
      if(selectedCategoryId===pos.categoryId)
        this.categoryjobPositions.push(pos);
    });

    this.spinnerService.hideSpinner();
  }
}