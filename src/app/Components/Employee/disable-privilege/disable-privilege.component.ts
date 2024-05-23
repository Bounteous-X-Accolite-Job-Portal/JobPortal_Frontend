import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../Models/Backend/Employee/Employee';
import { EmployeeService } from '../../../Services/AddEmployee/employee.service';
import { CommonModule } from '@angular/common';
import { Designation } from '../../../Models/DesignationResponse/Designation';

@Component({
  selector: 'app-disable-privilege',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './disable-privilege.component.html',
  styleUrl: './disable-privilege.component.css'
})
export class DisablePrivilegeComponent implements OnInit{
Employees!: Employee[];
Designations: Designation[] = [];

constructor(private employeeService: EmployeeService){}

ngOnInit(){
  this.fetchingEmployees();

}

fetchingEmployees(){
  this.employeeService.getAllEmployee().subscribe(
    (res)=>{
      console.log(res);
      this.Employees = res.employees;

      for(let i=0;i<this.Employees.length;i++)
        this.getDesignationByDesignationId(this.Employees[i].designationId);

      console.log("emps : ",this.Employees);
      console.log("des : ",this.Designations);
    },
    (error)=>{
      console.log(error);
    }
  )
}

private getDesignationByDesignationId(designationId:number):void
{
  this.employeeService.getDesignationByDesignationId(designationId).subscribe(
    (res)=>{
      console.log(designationId," > ",res);
      this.Designations.push(res.designation);

      console.log("desg:  ",this.Designations);
    },  
    (error)=>{
      console.log(error);
    }
  )
}

disableEmployee(employeeId: any){
  console.log(employeeId);
  this.employeeService.disableEmployee(employeeId).subscribe(
    (res)=>{
      console.log(res);
    },
    (error)=>{
      console.log(error);
    }
  )
}



}
