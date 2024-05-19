import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { location } from '../../../Models/JoblocationResponse/location';
import { CrudJobDataService } from '../../../Services/CrudJobData/crud-job-data.service';

import { RouterLink } from '@angular/router';
import { JobService } from '../../../Services/Job/job.service';

@Component({
  selector: 'app-crud-location-job-data',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './crud-location-job-data.component.html',
  styleUrl: './crud-location-job-data.component.css'
})
export class CrudLocationJobDataComponent {

  locations: location[] = [];

  constructor(private jobService: JobService, private crudJobDataService: CrudJobDataService){}
  ngOnInit(){
    this.loadJobLocations();
  }

  deleteByLocationId(locationId: string) : void{
    this.crudJobDataService.deleteLocationByLocationId(locationId).subscribe(
      (res) => {
        console.log("Location Deleted!");
        this.loadJobLocations();
      },
      (error) => {
        console.error('Error deleting location:', error);
      }
    );
  }
  
  private loadJobLocations(): void {
    this.jobService.getAllJobLocations().subscribe(
      (res) => {
        this.locations = res.allJobLocations;
        console.log(this.locations);
      },
      (error) => {
        console.error('Error loading job locations:', error);
      }
    );
  }

}


