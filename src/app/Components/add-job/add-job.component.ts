import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JobCategory } from '../../Models/JobCategoryResponse/JobCategory';
import { JobService } from '../../Services/job.service';
import { location } from '../../Models/JoblocationResponse/location';
import { JobType } from '../../Models/JobTypeResponse/JobType';
import { isDate } from 'util/types';
@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css',
})
export class AddJobComponent implements OnInit {

  jobForm!: FormGroup;
  isLoading: boolean =false;
  submitting = false;
  submitted = false;
  jobCategories: JobCategory[] = [];
  locations: location[] = [];
  jobTypes: JobType[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService
  ){}

  ngOnInit() {
    this.jobForm = this.formBuilder.group({
      jobCode: ['', Validators.required],
      jobDescription: ['', Validators.required],
      lastDate: ['', Validators.required],
      jobTitle: ['', [Validators.required]],
      description: ['', Validators.required],
      empId: ['', Validators.required],
      designation: [''],
      experience: [''],
    },
    {
      // validators: this.lastDateValidator,
    });
    this.loadJobLocations();
    this.loadJobTypes();
    this.loadJobCategories();

  }


  // lastDateValidator(formGroup: FormGroup): any {
  //   const lastDate = formGroup.get('password');
  //   const confirmPasswordControl = formGroup.get('confirmPassword');

  //   if (passwordControl && confirmPasswordControl) {
  //     const password = passwordControl.value;
  //     const confirmPassword = confirmPasswordControl.value;

  //     if (password !== confirmPassword && confirmPassword !== '') {
  //       confirmPasswordControl.setErrors({ passwordMismatch: true });
  //       return { passwordMismatch: true };
  //     } else {
  //       confirmPasswordControl.setErrors(null);
  //       return null;
  //     }
  //   } else {
  //     return null;
  //   }
  // }


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
 
  get f() {
    return this.jobForm.controls;
  }


  onSubmit() {
    this.submitted = true;

    //   if (this.jobForm.invalid) {
    //     return;
    //   } else {
    //     const empData = {
    //       FirstName: this.jobForm.value.firstName,
    //       LastName: this.jobForm.value.lastName,
    //       Email: this.jobForm.value.email,
    //       Phone: this.jobForm.value.phone,
    //       EmpId: this.jobForm.value.empId,
    //       Designation: this.jobForm.value.designation,
    //     };
    //   }
  }
}
