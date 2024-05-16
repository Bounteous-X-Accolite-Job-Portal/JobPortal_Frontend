import { Component } from '@angular/core';
import { Degree } from '../../../Models/DegreeResponse/Degree';
import { CommonModule } from '@angular/common';

import { CrudJobDataService } from '../../../Services/CrudJobData/crud-job-data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JobService } from '../../../Services/Job/job.service';

@Component({
  selector: 'app-crud-degree-data',
  standalone: true,
  imports: [CommonModule, ToastrModule, ReactiveFormsModule, RouterLink],
  templateUrl: './crud-degree-data.component.html',
  styleUrl: './crud-degree-data.component.css',
})
export class CrudDegreeDataComponent {
  degrees: Degree[] = [];

  constructor(
    private jobService: JobService,
    private crudJobDataService: CrudJobDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadDegrees();
  }

  private loadDegrees(): void {
    this.jobService.getAllDegrees().subscribe(
      (res) => {
        this.degrees = res.degrees;
        console.log(this.degrees);
      },
      (error) => {
        console.error('Error loading Degrees:', error);
      }
    );
  }

  deleteDegreeById(degreeId: string): void {
    this.crudJobDataService.deleteDegreeByDegreeId(degreeId).subscribe(
      (res) => {
        console.log('Category Deleted!', res);
        this.loadDegrees();
        this.toastr.success('Degree Deleted Successfully !!');
      },
      (error) => {
        console.error('Error deleting degree:', error);
        this.toastr.error('Error', error);
      }
    );
  }
}
