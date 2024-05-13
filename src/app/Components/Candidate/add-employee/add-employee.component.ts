import { CommonModule, NgClass, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { error } from 'console';
import { AddEmployeeService } from '../../../Services/AddEmployee/add-employee.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private addEmployeeService: AddEmployeeService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // form with validation rules
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]],
      phone: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      empId: ['', Validators.required],
      designation: [''],
    });

    // this.title = 'Add Employee';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    } else {
      const empData = {
        FirstName: this.form.value.firstName,
        LastName: this.form.value.lastName,
        Email: this.form.value.email,
        Phone: this.form.value.phone,
        EmpId: this.form.value.empId,
        Designation: this.form.value.designation,
      };

      this.addEmployeeService.addEmployee(empData).subscribe(
        // {
      //   next: (v) => console.log(v),
      //   error: (e) => console.error(e),
      // });
        (data: any) => {
          console.log('Status', data.status, 'data message', data.message);
          if (data.status == 200) {
            this.router.navigate(['/user-profile']);
          } else {
            console.log('error');
          }
        }
      );
      this.submitting = true;
    }
  }
}
