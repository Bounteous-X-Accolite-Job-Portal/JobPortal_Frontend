import { NgClass, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../../Services/AddEmployee/employee.service';
import { Designation } from '../../../Models/DesignationResponse/Designation';
import { AddEmployee } from '../../../Models/Backend/Employee/AddEmployee';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule, HttpClientModule, ToastrModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  toaster = inject(ToastrService);
  
  designation!: Designation;
  addEmployeeForm!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitted = false;

  constructor(
    private addEmployeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.addEmployeeForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      empId: new FormControl('', Validators.required),
      designationId: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.addEmployeeForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    let employee : AddEmployee = {
      empId : this.addEmployeeForm.value.empId,
      firstName : this.addEmployeeForm.value.firstName,
      lastName : this.addEmployeeForm.value.lastName,
      email : this.addEmployeeForm.value.email,
      phone : this.addEmployeeForm.value.phone,
      designationId : this.addEmployeeForm.value.designationId,
    }

    if (this.addEmployeeForm.invalid) {
      return;
    } else {
      console.log(employee);

      this.addEmployeeService
        .addEmployee(employee)
        .subscribe((data: any) => {
          console.log('Status', data.status, 'data message', data.message);

          if (data.status == 200) {
            this.loading = false;
            this.toaster.success("Successfully added employee.");
            console.log('success adding employee');
            
            this.submitted = false;
            this.addEmployeeForm.reset();
          } else {
            this.toaster.error("Some error occured while registering employee, please try again.");
            console.log('error');
          }
        });
    }
  }
}
