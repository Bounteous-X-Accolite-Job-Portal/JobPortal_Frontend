import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JobCategory } from '../../../Models/JobCategoryResponse/JobCategory';
import { JobService } from '../../../Services/Job/job.service';
import { location } from '../../../Models/JoblocationResponse/location';
import { JobType } from '../../../Models/JobTypeResponse/JobType';
import { AddJobService } from '../../../Services/add-job.service';
import { position } from '../../../Models/JobPositionResponse/position';
import { Degree } from '../../../Models/DegreeResponse/Degree';
import { Job } from '../../../Models/JobResponse/Job';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { SpinnerService } from '../../../Services/spinner.service';
import { timestamp } from 'rxjs';

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
  degrees: Degree[] = [];
  jobs: Job[] = [];
  // Filterjobs: Job[] = [];
  jobData: any;
  lastDateError: boolean = true;

  positionIndex: number = 0;
  typeIndex: number = 0;
  locationIndex: number = 0;
  categoryIndex: number = 0;
  degreeIndex: number = 0;

  constructor(
    private jobService: JobService,
    private addJobService: AddJobService,
    private datePipe: DatePipe
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
        degreeId: new FormControl(''),
        categoryId: new FormControl(''),
        positionId: new FormControl(''),
        locationId: new FormControl(''),
        jobType: new FormControl(''),
        experience: new FormControl(''),
        lastDate: new FormControl('', Validators.required),
      },
      // {
      //   validators: this.lastDateValidator,
      // }
    );
  }


  // lastDateValidator(formGroup: AbstractControl): any {

  //   const currDate = Date.now();
  //   const inputlastdateControl = formGroup.get('lastDate');
  //   if(currDate && inputlastdateControl){
  //     let date1 = formatDate(currDate ,'yyyy-MM-dd','en_US');
  //     let date2 = formatDate(inputlastdateControl.value,'yyyy-MM-dd','en_US');

  //     if(date1>date2){
  //       console.log('---date1 is greater----');
  //       inputlastdateControl.setErrors({ lastDateError: true });
  //       return { lastDateError : true};
  //      }else{
  //       console.log('---date2 is greater-----');
  //       inputlastdateControl.setErrors(null);
  //       return null;
  //      }
  //   }else{
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
        this.degrees = res.degrees;
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
      degreeId: this.degrees[this.degreeIndex].degreeId,
      categoryId: this.jobCategories[this.categoryIndex].categoryId,
      positionId: this.jobPositions[this.positionIndex].positionId,
      locationId: this.locations[this.locationIndex].locationId,
      jobType: this.jobTypes[this.typeIndex].jobTypeId,
      experience: this.jobForm.value.experience,
      lastDate: this.jobForm.value.lastDate,
    };
    let given = this.jobForm.value.lastDate;
    // console.log(given.getTime(), "   : " , );
    // let currentDate = new Date();
      
    // formatDate(currentDate, 'yyyy/MM/dd', 'en');
    // console.log("formatted " ,currentDate.getTime());

    if (this.jobForm.valid) {
     

      console.log(this.jobForm.value.lastDate, " ", new Date());
      this.addJobService.addJobs(this.jobData).subscribe(
        (res) => {
          console.log(
            'success '
          );
        },
        (error) => {
          console.error('Error submission:', error);
        }
      );
    } else {
      // this.jobForm.reset();
      console.log('invalid form');
    }
    this.submitted = true;
  }
}
