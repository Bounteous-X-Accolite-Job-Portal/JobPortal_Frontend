import { Component, Input } from '@angular/core';
import { Employee } from '../../../Models/Backend/Employee/Employee';
import { Designation } from '../../../Models/DesignationResponse/Designation';
import { EmployeeService } from '../../../Services/AddEmployee/employee.service';
import { CommonModule } from '@angular/common';
import { AllEmployee } from '../../../Models/Backend/Employee/AllEmployee';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css'
})
export class EmployeeCardComponent {
  @Input() disabledEmployee !: boolean;
  @Input() Employee! : Employee; 
  
  Designation!: Designation;
  
  constructor(private employeeService: EmployeeService){}
  
  ngOnInit(){
    console.log("loaded : ",this.Employee);
    this.getDesignationByDesignationId(this.Employee.designationId);
  }
 
  private getDesignationByDesignationId(designationId:number):void
  {
    this.employeeService.getDesignationByDesignationId(designationId).subscribe(
      (res)=>{
  
        console.log("desg:  ",this.Designation);
        this.Designation = res.designation;
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
