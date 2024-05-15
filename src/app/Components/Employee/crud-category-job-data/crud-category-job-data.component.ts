import { Component, OnInit } from '@angular/core';

import { JobCategory } from '../../../Models/JobCategoryResponse/JobCategory';
import { CommonModule } from '@angular/common';
import { CrudJobDataService } from '../../../Services/CrudJobData/crud-job-data.service';
import { AddJobComponent } from '../add-job/add-job.component';
import { RouterLink } from '@angular/router';
import { JobService } from '../../../Services/Job/job.service';

@Component({
  selector: 'app-crud-category-job-data',
  standalone: true,
  imports: [ CommonModule, AddJobComponent, RouterLink ],
  templateUrl: './crud-category-job-data.component.html',
  styleUrl: './crud-category-job-data.component.css'
})
export class CrudCategoryJobDataComponent implements OnInit{
  jobCategories: JobCategory[] = [];

  constructor(private jobService: JobService, private crudJobDataService: CrudJobDataService){}
  ngOnInit(){
    this.loadJobCategories();
  }
 
  private loadJobCategories(): void {
    this.jobService.getAllJobCategories().subscribe(
      (res) => {
        this.jobCategories = res.allJobCategory;
        console.log(this.jobCategories);
      },
      (error) => {
        console.error('Error loading job categories:', error);
      }
    );
  }

  deleteCategoryById(categoryId : string) : void{
    this.crudJobDataService.deleteCategoryByCategoryId(categoryId).subscribe(
      (res) => {
        console.log("Category Deleted!");
        this.loadJobCategories();
      },
      (error) => {
        console.error('Error deleting categories:', error);
      }
    );
  }

  
}
