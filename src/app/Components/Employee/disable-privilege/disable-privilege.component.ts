import { Component } from '@angular/core';
import { Employee } from '../../../Models/Backend/Employee/Employee';
import { EmployeeService } from '../../../Services/AddEmployee/employee.service';
import { CommonModule } from '@angular/common';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';
import { SpinnerService } from '../../../Services/spinner.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-disable-privilege',
  standalone: true,
  templateUrl: './disable-privilege.component.html',
  styleUrl: './disable-privilege.component.css',
  imports: [EmployeeCardComponent, CommonModule, FormsModule],
})
export class DisablePrivilegeComponent {
  public ActiveEmployeesToggle: boolean = true;
  employees: Employee[] = [];

  activeEmployees: Employee[] = [];
  disabledEmployees: Employee[] = [];

  showActiveEmployees: Employee[] = [];
  showDisabledEmployees: Employee[] = [];

  searchText: string = '';

  constructor(
    private spinnerService: SpinnerService,
    private employeeService: EmployeeService,
    // private toastr: ToastrService
  ) {}

  ActiveEmployees() {
    this.searchText = "";
    this.ActiveEmployeesToggle = true;
  }

  DisabledEmployees() {
    this.searchText = "";
    this.ActiveEmployeesToggle = false;
  }

  ngOnInit(): void {
    this.loadEmployees();
    // console.log('employees', this.employees);
  }

  private loadEmployees(): void {
    this.spinnerService.showSpinner();

    this.employeeService.getAllEmployee().subscribe(
      (res) => {
        // console.log("all emplyees : ",res);
        
        this.employees = res.employees;

        this.employees.forEach((employee) => {
          // console.log('Inactive ' + employee.inactive);

          if (!employee.inactive) {
            this.activeEmployees.push(employee);
            // console.log(this.activeEmployees);
          } else {
            this.disabledEmployees.push(employee);
            // console.log(this.disabledEmployees);
          }
        });

        this.showActiveEmployees = this.activeEmployees;
        this.showDisabledEmployees = this.disabledEmployees;
        // console.log('Active emp : ', this.activeEmployees);
        // console.log('Disable emp : ', this.disabledEmployees);

        this.spinnerService.hideSpinner();
      },
      (error) => {
        // console.log(error);
        // console.log(' error : hide spinner');
        this.spinnerService.hideSpinner();
      }
    );
  }

  makeEmployeeDisable(data : {employeeId : string}){
    let newArray : Employee[] = [];
    for (let i = 0; i < this.activeEmployees.length; i++) {
        if (this.activeEmployees[i].employeeId !== data.employeeId) {
            newArray.push(this.activeEmployees[i]);
        }
        else{
          this.disabledEmployees.push(this.activeEmployees[i]);
        }
    }
    this.activeEmployees = newArray;
    this.showActiveEmployees = newArray;
    this.showDisabledEmployees = this.disabledEmployees;
  }

  makeEmployeeEnable(data : {employeeId : string}){
    let newArray : Employee[] = [];
    for (let i = 0; i < this.disabledEmployees.length; i++) {
        if (this.disabledEmployees[i].employeeId !== data.employeeId) {
            newArray.push(this.activeEmployees[i]);
        }
        else{
          this.activeEmployees.push(this.activeEmployees[i]);
        }
    }
    this.disabledEmployees = newArray;
    this.showDisabledEmployees = newArray;
    this.showActiveEmployees = this.activeEmployees;
  }

  search(text : string){
    if (!this.searchText) return;

    if (!text.trim()) {
      this.showActiveEmployees = this.activeEmployees.slice();
      this.showDisabledEmployees = this.disabledEmployees.slice();
      this.spinnerService.hideSpinner();  
      return;
    }

    if(this.ActiveEmployeesToggle){
      this.showActiveEmployees = this.activeEmployees.filter((item) => {
        const firstName = item.firstName.toLowerCase().includes(text.toLowerCase());
        const lastName = item.lastName.toLowerCase().includes(text.toLowerCase());
        const email = item.email.toLowerCase().includes(text.toLowerCase());
        const empId = item.empId.toLowerCase().includes(text.toLowerCase());
  
        return firstName || lastName || email || empId;
      });
    }
    else{
      this.showDisabledEmployees = this.disabledEmployees.filter((item) => {
        const firstName = item.firstName.toLowerCase().includes(text.toLowerCase());
        const lastName = item.lastName.toLowerCase().includes(text.toLowerCase());
        const email = item.email.toLowerCase().includes(text.toLowerCase());
        const empId = item.empId.toLowerCase().includes(text.toLowerCase());
  
        return firstName || lastName || email || empId;
      });
    }
  }
}
