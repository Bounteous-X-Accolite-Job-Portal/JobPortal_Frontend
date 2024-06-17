import { Component } from '@angular/core';
import { JobType } from '../../../Models/JobTypeResponse/JobType';
import { JobService } from '../../../Services/Job/job.service';
import { CrudJobDataService } from '../../../Services/CrudJobData/crud-job-data.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpinnerService } from '../../../Services/spinner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crud-types-job-data',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './crud-types-job-data.component.html',
  styleUrl: './crud-types-job-data.component.css'
})
export class CrudTypesJobDataComponent {

  jobTypes: JobType[] = [];

  constructor(private jobService: JobService, private crudJobDataService: CrudJobDataService,
    private spinnerService: SpinnerService, private toastr: ToastrService
  ){}
  ngOnInit(){
    this.loadJobTypes();
  }

  deleteByJobTypeId(jobTypeId: string) : void{
    this.crudJobDataService.deleteTypeByTypeId(jobTypeId).subscribe(
      (res) => {
        // console.log("Job type Deleted!");
        this.loadJobTypes();
      },
      (error) => {
        console.error('Error deleting job type:', error);
      }
    );
  }
  
  private loadJobTypes(): void {
    this.spinnerService.showSpinner();
    this.jobService.getAllJobTypes().subscribe(
      (res) => {
        this.jobTypes = res.allJobTypes;
        this.spinnerService.hideSpinner();
        // console.log(this.jobTypes);
      },
      (error) => {
        this.spinnerService.hideSpinner();
        this.toastr.error('Error loading job types:', error);
      }
    );
  }
}
