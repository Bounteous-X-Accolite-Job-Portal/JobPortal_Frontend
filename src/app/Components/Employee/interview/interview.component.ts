import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../../Models/Backend/Employee';
import { AllEmployee } from '../../../Models/Backend/AllEmployee';
import { FilterPipe } from '../../../Models/filter.pipe';
import { Interview } from '../../../Models/Interview';
import { ActivatedRoute } from '@angular/router';
import { interviewResponse } from '../../../Models/InterviewResponse/InterviewResponse';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe, ReactiveFormsModule],
  templateUrl: './interview.component.html',
  styleUrl: './interview.component.css',
})
export class InterviewComponent implements OnInit{
  AddInterviewForm!: FormGroup;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  searchText = '';
  interview: Interview[] = [];
  employee: Employee[] = [];
  filteredEmployees: any[] = [];

  ngOnInit() {
    this.AddInterviewForm = new FormGroup({
      interviewDate: new FormControl(''),
      interviewTime: new FormControl(''),
      interviewerId: new FormControl(''),
      link: new FormControl(''),
    });
  }

  fetchEmployee(searchText: string) {
    if (!searchText) return;

    this.http
      .get<AllEmployee>(environment.baseURL + 'EmployeeAccount/getAllEmployees')
      .subscribe(
        (data: AllEmployee) => {
          console.log(data);
          this.employee = data.employees;
          this.filterItems(searchText);
        },
        (error) => {
          console.error('Error fetching employees:', error);
        }
      );
  }

  filterItems(searchText: string) {
    if (!searchText.trim()) {
      this.filteredEmployees = this.employee.slice();
      return;
    }

    this.filteredEmployees = this.employee.filter((item) => {
      const firstnameMatch = item.firstName.toLowerCase().includes(searchText);
      const lastnameMatch = item.lastName.toLowerCase().includes(searchText);
      const emailMatch = item.email.toLowerCase().includes(searchText);
      const idMatch = item.empId.toString().includes(searchText);
      return firstnameMatch || lastnameMatch || emailMatch || idMatch;
    });
  }

  getEmployeeId(employeeId: string) {
    this.searchText = employeeId;
                                                                                                                                               
  }

  onSubmit() {
    const applicationId = String(this.route.snapshot.params['applicationId']);
    // this.AddInterviewForm = {
    //   interviewDate: this.AddInterviewForm.value.interviewDate,
    //   interviewTime: this.AddInterviewForm.value.interviewTime,
    //   interviewerId: this.AddInterviewForm.value.interviewerId,
    //   link: this.AddInterviewForm.value.link,
    // };

    if (this.AddInterviewForm.valid) {
      this.http
        .post(
          environment.baseURL + 'Interview/AddInterview',
          this.AddInterviewForm.value
        )
        .subscribe(
          (response) => {
            console.log('success : ', response);
            this.AddInterviewForm.reset();
          },
          (error) => {
            console.error('Error sending POST request:', error);
          }
        );
    } else {
      this.AddInterviewForm.markAllAsTouched();
    }
  }
}
