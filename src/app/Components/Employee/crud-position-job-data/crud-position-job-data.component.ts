import { Component } from '@angular/core';
import { position } from '../../../Models/JobPositionResponse/position';

import { CrudJobDataService } from '../../../Services/CrudJobData/crud-job-data.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { JobService } from '../../../Services/Job/job.service';
import { SpinnerService } from '../../../Services/spinner.service';

@Component({
  selector: 'app-crud-position-job-data',
  standalone: true,
  imports: [ CommonModule , RouterLink, ToastrModule],
  templateUrl: './crud-position-job-data.component.html',
  styleUrl: './crud-position-job-data.component.css'
})
export class CrudPositionJobDataComponent {

  jobPositions: position[] = [];

  constructor(
    private jobService: JobService,
    private crudJobDataService: CrudJobDataService,
    private toastr: ToastrService,
    private spinnerService: SpinnerService
  ){}
  
  ngOnInit(){
    this.loadJobPositions();
  }

  deleteByPositionId(positionId: string) : void{
    this.spinnerService.showSpinner();
    this.crudJobDataService.deletePositionByPositionId(positionId).subscribe(
      (res) => {
        // console.log(res);
        this.loadJobPositions();
        this.spinnerService.hideSpinner();
        this.toastr.success("Position Deleted Successfully!");
      },
      (error) => {
        this.spinnerService.hideSpinner();
        // console.error('Error deleting positions:', error);
        this.toastr.error('Error deleting positions:', error);
      }
    );
  }
  
  private loadJobPositions(): void {
    this.spinnerService.showSpinner();
    this.jobService.getAllJobPosition().subscribe(
      (res) => {
        this.spinnerService.hideSpinner();
        this.jobPositions = res.allJobPositions;
        
        // console.log(this.jobPositions);
      },
      (error) => {
        this.spinnerService.hideSpinner();
        this.toastr.error('Error loading job types:', error);
        // console.error('Error loading job types:', error);
      }
    );
  }
}
