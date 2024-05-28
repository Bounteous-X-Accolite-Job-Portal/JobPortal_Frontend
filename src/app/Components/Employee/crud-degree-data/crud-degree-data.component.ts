import { Component } from '@angular/core';
import { Degree } from '../../../Models/DegreeResponse/Degree';
import { CommonModule } from '@angular/common';

import { CrudJobDataService } from '../../../Services/CrudJobData/crud-job-data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JobService } from '../../../Services/Job/job.service';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { SpinnerService } from '../../../Services/spinner.service';

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
    private toastr: ToastrService,
    private spinnerService : SpinnerService
  ) {}

  ngOnInit() {
    this.loadDegrees();
  }

  private loadDegrees(): void {
    this.spinnerService.showSpinner();
    this.jobService.getAllDegrees().subscribe(
      (res) => {
        this.degrees = res.degrees;
        this.spinnerService.hideSpinner();
        // console.log(this.degrees);
      },
      (error) => {
        // console.error('Error loading Degrees:', error);
        this.spinnerService.hideSpinner();
        this.toastr.error('Error loading Degrees:', error);
      }
    );
  }

  deleteDegreeById(degreeId: string): void {
    this.spinnerService.showSpinner();
    this.crudJobDataService.deleteDegreeByDegreeId(degreeId).subscribe(
      (res) => {
        // console.log('Category Deleted!', res);
        this.loadDegrees();
        this.spinnerService.hideSpinner();
        this.toastr.success('Degree Deleted Successfully !!');
      },
      (error) => {
        this.spinnerService.hideSpinner();
        // console.error('Error deleting degree:', error);
        this.toastr.error('Error', error);
      }
    );
  }
}
