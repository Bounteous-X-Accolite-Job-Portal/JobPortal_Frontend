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
import { Employee } from '../../../Models/Backend/Employee/Employee';
import { AllEmployee } from '../../../Models/Backend/Employee/AllEmployee';
import { FilterPipe } from '../../../Models/filter.pipe';
import { Interview } from '../../../Models/InterviewResponse/Interview';
import { ActivatedRoute } from '@angular/router';
import { interviewResponse } from '../../../Models/InterviewResponse/InterviewResponse';
import { timeStamp } from 'console';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe, ReactiveFormsModule],
  templateUrl: './interview.component.html',
  styleUrl: './interview.component.css',
})
export class InterviewComponent implements OnInit {
  addInterviewForm!: FormGroup;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  searchText = '';
  isListVisible = false;
  interview: Interview[] = [];
  employee: Employee[] = [];
  filteredEmployees: any[] = [];

  ngOnInit() {
    this.addInterviewForm = new FormGroup({
      interviewDate: new FormControl(Date),
      interviewTime: new FormControl(''),
      interviewerId: new FormControl(''),
      link: new FormControl(''),
    });
  }

  fetchEmployee(searchText: string) {
    if (!searchText) return;
    this.isListVisible = true;
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
    this.isListVisible = false;
  }

  onSubmit() {

    const data = {
      applicationId: String(this.route.snapshot.params['applicationId']),
      interviewDate: this.addInterviewForm.value.interviewDate,
      interviewTime: this.addInterviewForm.value.interviewTime + ':00',
      interviewerId: this.searchText,
      link: this.addInterviewForm.value.link,
    };

    console.log(data);

    if (this.addInterviewForm.valid) {
      this.http
        .post(environment.baseURL + 'Interview/AddInterview', data)
        .subscribe(
          (response) => {
            console.log('success : ', response);
            this.addInterviewForm.reset();
          },
          (error) => {
            console.error('Error sending POST request:', error);
          }
        );
    } else {
      this.addInterviewForm.markAllAsTouched();
    }
  }
}
