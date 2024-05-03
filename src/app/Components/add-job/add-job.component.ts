import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css',
})
export class AddJobComponent implements OnInit {
  // addNewJob = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   email: new FormControl(''),
  // });
  jobForm!: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;
  // handleError: any;
  // handleUpdateResponse: any;

  constructor(
    private formBuilder: FormBuilder
  ) //   private route: ActivatedRoute,
  //   private router: Router,
  //   private jobService: JobService
  {}

  ngOnInit() {
    //   // form with validation rules
    this.jobForm = this.formBuilder.group({
      jobCode: ['', Validators.required],
      jobDescription: ['', Validators.required],
      jobTitle: ['', [Validators.required]],
      description: ['', Validators.required],
      empId: ['', Validators.required],
      experience: [''],
    });

    //   // this.title = 'Add Employee';
  }

  // // convenience getter for easy access to form fields
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
