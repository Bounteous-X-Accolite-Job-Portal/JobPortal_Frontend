import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Employee } from '../../../Models/Backend/Employee/Employee';
import { AllEmployee } from '../../../Models/Backend/Employee/AllEmployee';
import { FilterPipe } from '../../../Models/filter.pipe';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../../Services/spinner.service';
import { EmployeeService } from '../../../Services/AddEmployee/employee.service';
import { ToastrService } from 'ngx-toastr';
import { AddInterviewResponse } from '../../../Models/InterviewResponse/AddInterviewResponse';
import { InterviewService } from '../../../Services/InterviewService/interview.service';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe, ReactiveFormsModule],
  templateUrl: './interview.component.html',
  styleUrl: './interview.component.css',
})
export class InterviewComponent implements OnInit {
  addInterviewForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private spinnerService: SpinnerService,
    private employeeService: EmployeeService,
    private _location: Location,
    private toast: ToastrService,
    private interviewService: InterviewService
  ) {}

  searchText = '';
  employeeIdOfInterviewer = '';
  isListVisible = false;
  employee: Employee[] = [];
  filteredEmployees: Employee[] = [];

  ngOnInit() {
    this.addInterviewForm = new FormGroup({
      interviewDate: new FormControl('', Validators.required),
      interviewTime: new FormControl('', Validators.required),
      // interviewerId: new FormControl('', Validators.required),
      link: new FormControl(''),
    });

    this.fetchAllEmployees();
  }

  fetchAllEmployees() {
    this.spinnerService.showSpinner();

    this.employeeService.getAllEmployee().subscribe(
      (result: AllEmployee) => {
        // console.log("all employees", result);
        this.employee = result.employees;
        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  filterItems(searchText: string) {
    if (!searchText) return;

    this.spinnerService.showSpinner();

    this.isListVisible = true;

    if (!searchText.trim()) {
      this.filteredEmployees = this.employee.slice();
      this.spinnerService.hideSpinner();
      return;
    }

    this.filteredEmployees = this.employee.filter((item) => {
      const firstnameMatch = item.firstName.toLowerCase().includes(searchText.toLowerCase());
      const lastnameMatch = item.lastName.toLowerCase().includes(searchText.toLowerCase());
      const emailMatch = item.email.toLowerCase().includes(searchText.toLowerCase());
      const idMatch = item.empId.toString().includes(searchText.toLowerCase());
      return firstnameMatch || lastnameMatch || emailMatch || idMatch;
    });

    this.spinnerService.hideSpinner();
  }

  get f() {
    return this.addInterviewForm.controls;
  }

  getEmployeeId(employee: Employee) {
    this.spinnerService.showSpinner();

    this.searchText =
      employee.firstName +
      ' ' +
      employee.lastName +
      ' (' +
      employee.empId +
      ')';
    this.employeeIdOfInterviewer = employee.employeeId;
    this.isListVisible = false;

    //console.log('interviewer id ', this.employeeIdOfInterviewer);

    this.spinnerService.hideSpinner();
  }

  onSubmit() {
    this.spinnerService.showSpinner();

    const data = {
      applicationId: String(this.route.snapshot.params['applicationId']),
      interviewDate: this.addInterviewForm.value.interviewDate,
      interviewTime: this.addInterviewForm.value.interviewTime + ':00',
      interviewerId: this.employeeIdOfInterviewer,
      link: this.addInterviewForm.value.link,
    };

    if (this.addInterviewForm.valid) {
      this.interviewService.addInterview(data).subscribe(
        (response: AddInterviewResponse) => {
          // console.log('success : ', response);
          if(response.status === 200){
            this.toast.success(response.message);

            this.addInterviewForm.reset();
            this.employeeIdOfInterviewer = '';
          }
          else{
            this.toast.error(response.message);
          }

          this.spinnerService.hideSpinner();
        },
        (error) => {
          console.error('Error sending POST request:', error);
          this.toast.error('Error while scheduling interview');
          this.spinnerService.hideSpinner();
        }
      );
    } else {
      this.toast.error('invalid form');
      this.spinnerService.hideSpinner();
    }
  }

  backClicked() {
    this._location.back();
  }
}
