import { CommonModule, NgClass, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../Services/AddEmployee/employee.service';
import { Designation } from '../../../Models/DesignationResponse/Designation';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule, HttpClientModule,ToastrModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  designation!: Designation;
  addEmployeeForm!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private addEmployeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // this.id = this.route.snapshot.params['id'];

    this.addEmployeeForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.minLength(6)),
      empId: new FormControl('', Validators.required),
      designationId: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.addEmployeeForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.addEmployeeForm.invalid) {
      return;
    } else {
      console.log(this.addEmployeeForm.value);

      this.addEmployeeService
        .addEmployee(this.addEmployeeForm.value)
        .subscribe((data: any) => {
          console.log('Status', data.status, 'data message', data.message);
          if (data.status == 200) {
            this.loading = false;
            console.log('success adding employee');
            this.toastr.success("Employee Added Successfully !! ");
          } else {
            console.log('error');
          }
        });
      this.submitting = true;
    }
  }
}
