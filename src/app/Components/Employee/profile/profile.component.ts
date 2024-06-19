import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../../Services/spinner.service';
import { EmployeeService } from '../../../Services/AddEmployee/employee.service';
import { UserStoreService } from '../../../Services/user-store.service';
import { AuthService } from '../../../Services/auth.service';
import { Employee } from '../../../Models/Backend/Employee/Employee';
import { EmployeeProfileData } from '../../../Models/Backend/Employee/EmployeeProfileData';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  employeeId : string = "";
  employee !: Employee;
  designation : string = "";

  interviewsTaken : number = 0;
  candidatesReferred : number = 0;
  jobsAdded : number = 0;

  hasPrivilege : boolean = false;
  hasSpecialPrivilege : boolean = false;

  constructor(
    private spinnerService: SpinnerService,
    private employeeService: EmployeeService,
    private store: UserStoreService,
    private authService: AuthService,
    private userStore : UserStoreService, 
  ) { }

  ngOnInit(): void {
    this.getEmployeeId();
    this.loadProfile();
    this.loadDesignation();
    this.loadProfileData();
    this.checkHasPrivilege();
    this.checkHasSpecialPrivilege();
  }

  getEmployeeId(){
    this.spinnerService.showSpinner();

    this.store.getIdFromStore().subscribe(
      (val) => {
        this.employeeId = val || this.authService.getIdFromToken();
        this.spinnerService.hideSpinner();
      },
      (error) => {
        // console.log(error);
        this.spinnerService.hideSpinner();
      }
    )
  }

  loadDesignation(){
    this.spinnerService.showSpinner();

    this.store.getRoleFromStore().subscribe(
      (val) => {
        let des = val || this.authService.getRoleFromToken();
        this.designation = des.charAt(0).toUpperCase() + des.substr(1);
        this.spinnerService.hideSpinner();
      },
      (error) => {
        // console.log(error);
        this.spinnerService.hideSpinner();
      }
    )
  }

  loadProfile(){
    this.spinnerService.showSpinner();

    this.employeeService.getEmployeeById(this.employeeId).subscribe(
      (res) => {
        // console.log(res);

        this.employee = res.employee;

        this.spinnerService.hideSpinner();
      },
      (error) => {
        // console.log(error);
        this.spinnerService.hideSpinner();
      }
    )
  }

  loadProfileData(){
    this.spinnerService.showSpinner();

    this.employeeService.getEmployeeProfileData(this.employeeId).subscribe(
      (res : EmployeeProfileData) => {
        // console.log(res);

        this.interviewsTaken = res.interviewTaken;
        this.candidatesReferred = res.candidatesReferred;
        this.jobsAdded = res.jobAdded;

        this.spinnerService.hideSpinner();
      },
      (error) => {
        // console.log(error);
        this.spinnerService.hideSpinner();
      }
    )
  }

  checkHasPrivilege(){
    this.spinnerService.showSpinner();

    this.userStore.checkHasPrivilegeFromStore()
    .subscribe((val) => {
        let privilege = this.authService.checkHasPrivilegeFromToken();
        this.hasPrivilege = val || privilege;
    })

    this.spinnerService.hideSpinner();

    // console.log("hasPrivilege at emp dash", this.hasPrivilege);
  }

  checkHasSpecialPrivilege(){
    this.spinnerService.showSpinner();

    this.userStore.checkHasSpecialPrivilegeFromStore()
    .subscribe((val) => {
        let specialPrivilege = this.authService.checkHasSpecialPrivilegeFromToken();
        this.hasSpecialPrivilege = val || specialPrivilege;
        // this.hasPrivilege  = false;
        // this.hasSpecialPrivilege  = false;
    })

    this.spinnerService.hideSpinner();

    // console.log("hasSpecialPrivilege at emp dash", this.hasSpecialPrivilege);
  }

}
