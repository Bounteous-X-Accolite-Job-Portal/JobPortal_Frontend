import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../Models/Backend/Employee/Employee';
import { EmployeeService } from '../../../Services/AddEmployee/employee.service';
import { CommonModule } from '@angular/common';
import { Designation } from '../../../Models/DesignationResponse/Designation';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';
import { AllEmployee } from '../../../Models/Backend/Employee/AllEmployee';
import { EmployeeCardData } from '../../../Models/Backend/Employee/EmployeeCardData';
import { SpinnerService } from '../../../Services/spinner.service';
import { error } from 'console';

@Component({
  selector: 'app-disable-privilege',
  standalone: true,
  templateUrl: './disable-privilege.component.html',
  styleUrl: './disable-privilege.component.css',
  imports: [EmployeeCardComponent, CommonModule],
})
export class DisablePrivilegeComponent {
  public ActiveEmployeesToggle: boolean = true;
  employees: Employee[] = [];
  activeEmployees: Employee[] = [];
  disabledEmployees: Employee[] = [];

  constructor(
    private spinnerService: SpinnerService,
    private employeeService: EmployeeService
  ) {}

  ActiveEmployees() {
    this.ActiveEmployeesToggle = true;
  }

  DisabledEmployees() {
    this.ActiveEmployeesToggle = false;
  }

  ngOnInit(): void {
    this.loadEmployees();
    console.log('employees', this.employees);
  }

  private loadEmployees(): void {
    console.log('show spinner');
    // this.spinnerService.showSpinner();

    this.employeeService.getAllEmployee().subscribe(
      (res) => {
        console.log("all emplyees : ",res);
        this.employees = res.employees;
        this.employees.forEach((employee) => {
          console.log('Inactive ' + employee.inactive);

          if (!employee.inactive) {
            this.activeEmployees.push(employee);
            console.log(this.activeEmployees);
          } else {
            this.disabledEmployees.push(employee);
            console.log(this.disabledEmployees);
          }
          // console.log('hide spinner');
          // this.spinnerService.hideSpinner();
        });

        console.log('Active emp : ', this.activeEmployees);
        console.log('Disable emp : ', this.disabledEmployees);
      },
      (error) => {
        console.log(error);
        console.log(' error : hide spinner');
        // this.spinnerService.hideSpinner();
      }
    );
  }
}
