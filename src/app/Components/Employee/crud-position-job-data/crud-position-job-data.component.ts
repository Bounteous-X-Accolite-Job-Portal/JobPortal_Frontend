import { Component } from '@angular/core';
import { position } from '../../../Models/JobPositionResponse/position';

import { CrudJobDataService } from '../../../Services/CrudJobData/crud-job-data.service';
import { CommonModule } from '@angular/common';
import { JobService } from '../../../Services/Job/job.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crud-position-job-data',
  standalone: true,
  imports: [ CommonModule ,RouterLink ],
  templateUrl: './crud-position-job-data.component.html',
  styleUrl: './crud-position-job-data.component.css'
})
export class CrudPositionJobDataComponent {

  jobPositions: position[] = [];

  constructor(private crudJobDataService: CrudJobDataService,private jobService : JobService){}
  ngOnInit(){
    this.loadJobPositions();
  }

  deleteByPositionId(positionId: string) : void{
    this.crudJobDataService.deletePositionByPositionId(positionId).subscribe(
      (res) => {
        console.log("Category Deleted!");
        this.loadJobPositions();
      },
      (error) => {
        console.error('Error deleting categories:', error);
      }
    );
  }
  
  private loadJobPositions(): void {
    this.jobService.getAllJobPosition().subscribe(
      (res) => {
        this.jobPositions = res.allJobPositions;
        console.log(this.jobPositions);
      },
      (error) => {
        console.error('Error loading job types:', error);
      }
    );
  }
}
