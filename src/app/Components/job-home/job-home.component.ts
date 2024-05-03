import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { JobCardComponent } from '../job-card/job-card.component';
import { JobService } from '../../Services/job.service';
import { JobType } from '../../Models/JobTypeResponse/JobType';
import { JobCategory } from '../../Models/JobCategoryResponse/JobCategory';
import { location } from '../../Models/JoblocationResponse/location';
import { position } from '../../Models/JobPositionResponse/position';

@Component({
  standalone: true,
  selector: 'app-job-home',
  templateUrl: './job-home.component.html',
  imports: [CommonModule,JobCardComponent],
  styleUrls: ['./job-home.component.css'],
  moduleId: module.id, // Required for CommonJS
})
export class JobHomeComponent implements OnInit {
  arr: number[] = new Array(100);
  locations: location[] = [];
  jobTypes: JobType[] = [];
  jobCategories: JobCategory[] = [];
  jobPositions: position[] =[];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobLocations();
    this.loadJobTypes();
    this.loadJobCategories();
    this.loadJobPositions();
  }

  private loadJobLocations(): void {
    this.jobService.getAllJobLocations().subscribe(
      (res) => {
        this.locations = res.allJobLocations;
      },
      (error) => {
        console.error('Error loading job locations:', error);
      }
    );
  }

  private loadJobTypes(): void {
    this.jobService.getAllJobTypes().subscribe(
      (res) => {
        this.jobTypes = res.allJobTypes;
      },
      (error) => {
        console.error('Error loading job types:', error);
      }
    );
  }

  private loadJobCategories(): void {
    this.jobService.getAllJobCategories().subscribe(
      (res) => {
        this.jobCategories = res.allJobCategory;
      },
      (error) => {
        console.error('Error loading job categories:', error);
      }
    );
  }

  private loadJobPositions(): void{
    this.jobService.getAllJobPosition().subscribe(
      (res) => {
        this.jobPositions = res.allJobPositions;
      },
      (error) => {
        console.error('Error loading job Positions:',error);
      }
    );
  }
}
