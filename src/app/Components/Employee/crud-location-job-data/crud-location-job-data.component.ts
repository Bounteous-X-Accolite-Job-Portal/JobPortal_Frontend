import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { location } from '../../../Models/JoblocationResponse/location';
import { CrudJobDataService } from '../../../Services/CrudJobData/crud-job-data.service';

import { RouterLink } from '@angular/router';
import { JobService } from '../../../Services/Job/job.service';
import { SpinnerService } from '../../../Services/spinner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crud-location-job-data',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './crud-location-job-data.component.html',
  styleUrl: './crud-location-job-data.component.css'
})
export class CrudLocationJobDataComponent {

  locations: location[] = [];

  constructor(private jobService: JobService,
     private crudJobDataService: CrudJobDataService,
     private toastr: ToastrService,
    private spinnerService: SpinnerService){}
  ngOnInit(){
    this.loadJobLocations();
  }

  deleteByLocationId(locationId: string) : void{
    this.spinnerService.showSpinner();
    this.crudJobDataService.deleteLocationByLocationId(locationId).subscribe(
      (res) => {
        // console.log(res);
        // console.log("Location Deleted!");
        
        this.loadJobLocations();
        this.toastr.success("Location deleted succesfully!!");
        this.spinnerService.hideSpinner();
      },
      (error) => {
        // console.error('Error deleting location:', error);
        this.spinnerService.hideSpinner();
        this.toastr.error('Error deleting location:', error);
      }
    );
  }
  
  private loadJobLocations(): void {
    this.spinnerService.showSpinner();
    this.jobService.getAllJobLocations().subscribe(
      (res) => {
        this.locations = res.allJobLocations;
        this.spinnerService.hideSpinner();
        // console.log(this.locations);
      },
      (error) => {
        this.spinnerService.hideSpinner();
        this.toastr.error('Error loading job locations:', error);
      }
    );
  }

}


