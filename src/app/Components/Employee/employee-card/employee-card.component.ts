import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../../Models/Backend/Employee/Employee';
import { Designation } from '../../../Models/DesignationResponse/Designation';
import { EmployeeService } from '../../../Services/AddEmployee/employee.service';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../../Services/spinner.service';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [ CommonModule, ToastrModule ],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css'
})
export class EmployeeCardComponent {
  @Input() disabledEmployee !: boolean;
  @Input() Employee! : Employee; 
  @Output() changesStatus = new EventEmitter<{employeeId : string}>();
  
  Designation!: Designation;
  
  constructor(
    private employeeService: EmployeeService,
    private spinnerService: SpinnerService,
    private toasterService: ToastrService,
    private router : Router
  ){}
  
  ngOnInit(){
    // console.log("loaded : ",this.Employee);
    this.getDesignationByDesignationId(this.Employee.designationId);
  }
 
  private getDesignationByDesignationId(designationId:number){
    this.spinnerService.showSpinner();

    this.employeeService.getDesignationByDesignationId(designationId).subscribe(
      (res)=>{
        // console.log("desg:  ",this.Designation);
        this.Designation = res.designation;
        this.spinnerService.hideSpinner();
        

      },  
      (error)=>{
        // console.log(error);
        this.spinnerService.hideSpinner();
        this.toasterService.error('Error: ', error);
      }
    )
  }
  
  disableEmployee(employeeId: any){
    this.spinnerService.showSpinner();
    // console.log(employeeId);

    this.employeeService.disableEmployee(employeeId).subscribe(
      (res)=>{
        // console.log(res);
        if(res.status == 200){
          this.toasterService.success(res.message);
          this.changesStatus.emit({employeeId});
        }
        else{
          this.toasterService.error(res.message);
        }
        this.spinnerService.hideSpinner();
      },
      (error)=>{
        // console.log(error);
        this.toasterService.error("Something went wrong, please try again !");
        this.spinnerService.hideSpinner();
      }
    )
  }

  enableEmployee(employeeId : string){
    this.spinnerService.showSpinner();
    // console.log(employeeId);

    this.employeeService.enableEmployeeAccount(employeeId).subscribe(
      (res)=>{
        // console.log(res);

        if(res.status == 200){
          this.toasterService.success(res.message);
          this.spinnerService.hideSpinner();
          this.changesStatus.emit({employeeId});
        }
        else{
          this.toasterService.error(res.message);
          this.spinnerService.hideSpinner();
        }
      },
      (error)=>{
        // console.log(error);
        this.toasterService.error("Something went wrong, please try again !");
        this.spinnerService.hideSpinner();
      }
    )
  }
}
