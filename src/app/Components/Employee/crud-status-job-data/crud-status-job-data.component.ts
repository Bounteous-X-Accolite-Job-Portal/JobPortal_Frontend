import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusModel } from '../../../Models/StatusResponse/StatusModel';
import { CrudJobDataService } from '../../../Services/CrudJobData/crud-job-data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crud-status-job-data',
  standalone: true,
  imports: [CommonModule, RouterLink,ToastrModule],
  templateUrl: './crud-status-job-data.component.html',
  styleUrl: './crud-status-job-data.component.css'
})
export class CrudStatusJobDataComponent {
  applicationStatus :StatusModel[] = [];
  
  constructor(private crudJobDataService: CrudJobDataService , private toastr:ToastrService ) {} 

  ngOnInit():void{
    this.loadAllStatus();
  }

  private loadAllStatus():void{
    this.crudJobDataService.getAllJobStatus().subscribe(
      (res)=>{
        this.applicationStatus = res.allStatus;
        console.log(this.applicationStatus);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  public deleteStatus(id:number):void{
    this.crudJobDataService.deleteJobApplicationStatus(id).subscribe(
      (res)=>{
        console.log(res);
        this.toastr.success("Status Deleted Successfully !!");
        this.ngOnInit();
      },
      (error)=>{

      }
    );
  }
}
