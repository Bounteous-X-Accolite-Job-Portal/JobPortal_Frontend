import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../../Services/AddEmployee/employee.service';
import { Designation } from '../../../Models/DesignationResponse/Designation';
import { AddEmployee } from '../../../Models/Backend/Employee/AddEmployee';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../../Services/spinner.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  toaster = inject(ToastrService);

  addEmployeeForm!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitted = false;
  allDesignations: Designation[] = [];

  constructor(
    private addEmployeeService: EmployeeService,
    private spinnerService: SpinnerService
  ) {
    this.loadDesignations();
  }

  ngOnInit() {
    this.addEmployeeForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[6789][0-9]{9}'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      empId: new FormControl('', Validators.required),
      designationId: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.addEmployeeForm.controls;
  }

  private loadDesignations(): void {
    this.spinnerService.showSpinner();

    this.addEmployeeService.getAllDesignations().subscribe(
      (res) => {
        this.allDesignations = res.allDesignations;
        // console.log(res.allDesignations);
        this.spinnerService.hideSpinner();
      },
      (error) => {
        // console.log(error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  onSubmit() {
    this.spinnerService.showSpinner();
    this.submitted = true;

    let employee: AddEmployee = {
      empId: this.addEmployeeForm.value.empId,
      firstName: this.addEmployeeForm.value.firstName,
      lastName: this.addEmployeeForm.value.lastName,
      email: this.addEmployeeForm.value.email,
      phone: this.addEmployeeForm.value.phone,
      designationId: parseInt(this.addEmployeeForm.value.designationId, 10),
    };

    if (this.addEmployeeForm.invalid) {
      this.toaster.error('Invalid form, please fill all the details !');
      this.spinnerService.hideSpinner();
      return;
    } else {
      // console.log(employee);

      this.addEmployeeService.addEmployee(employee).subscribe(
        (data: any) => {
          // console.log('Status', data.status, 'data message', data.message);

          if (data.status == 200) {
            this.loading = false;

            this.toaster.success('Successfully added employee.');
            // console.log('success adding employee');

            this.submitted = false;
            this.addEmployeeForm.reset();

            this.spinnerService.hideSpinner();
          } else {
            this.toaster.error(data.message);
            // console.log('error');
            this.spinnerService.hideSpinner();
          }
        },
        (error) => {
          // console.log(error);
          this.toaster.error(
            'Some error occured while registering' + error.message
          );
          this.spinnerService.hideSpinner();
        }
      );
    }
  }
}
