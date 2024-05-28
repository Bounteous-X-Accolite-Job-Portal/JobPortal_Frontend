import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusModel } from '../../../Models/StatusResponse/StatusModel';
import { CrudJobDataService } from '../../../Services/CrudJobData/crud-job-data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../../Services/spinner.service';

@Component({
  selector: 'app-crud-status-job-data',
  standalone: true,
  imports: [CommonModule, RouterLink,ToastrModule],
  templateUrl: './crud-status-job-data.component.html',
  styleUrl: './crud-status-job-data.component.css'
})
export class CrudStatusJobDataComponent {
  applicationStatus :StatusModel[] = [];
  
  constructor(private crudJobDataService: CrudJobDataService , private toastr:ToastrService, private spinnerService: SpinnerService ) {} 

  ngOnInit():void{
    this.loadAllStatus();
  }

  private loadAllStatus():void{
    this.spinnerService.showSpinner();
    this.crudJobDataService.getAllJobStatus().subscribe(
      (res)=>{
        this.applicationStatus = res.allStatus;
        this.spinnerService.hideSpinner();
        // console.log(this.applicationStatus);
      },
      (error)=>{
        // console.log(error);
        this.spinnerService.hideSpinner();
        this.toastr.error("Error loading Status : ", error);
      }
    )
  }

  public deleteStatus(id:number):void{
    
    this.crudJobDataService.deleteJobApplicationStatus(id).subscribe(
      (res: any)=>{
        this.toastr.success("Status Deleted Successfully !!");
        this.spinnerService.showSpinner();
        this.loadAllStatus();
        this.spinnerService.hideSpinner();      },
      (error)=>{
        this.toastr.error("Error Deleting status:" , error);
      }
    );
  }
}
