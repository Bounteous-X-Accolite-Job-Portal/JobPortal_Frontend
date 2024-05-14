import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../Services/job.service';
import { JobCategory } from '../../../Models/JobCategoryResponse/JobCategory';
import { CommonModule } from '@angular/common';
import { CrudJobDataService } from '../../../Services/CrudJobData/crud-job-data.service';

@Component({
  selector: 'app-crud-job-data',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './crud-job-data.component.html',
  styleUrl: './crud-job-data.component.css'
})
export class CrudJobDataComponent implements OnInit{
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

  deleteByCategoryId(categoryId : string) : void{
    this.crudJobDataService.deleteByCategoryId(categoryId).subscribe(
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
