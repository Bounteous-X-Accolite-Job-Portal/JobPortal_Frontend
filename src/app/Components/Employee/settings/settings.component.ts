import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JobService } from '../../../Services/job.service';
import { JobCategory } from '../../../Models/JobCategoryResponse/JobCategory';
import { RouterLink } from '@angular/router';
import { CrudJobDataService } from '../../../Services/CrudJobData/crud-job-data.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  addCategoryForm!: FormGroup;
  addPositionForm!: FormGroup;
  addLocationForm!: FormGroup;
  addTypeForm!: FormGroup;
  addDegreeForm!: FormGroup;
  addInstitutionForm!: FormGroup;
  categoryIndex = 0;

  jobCategories: JobCategory[] = [];
  constructor(
    private http: HttpClient,
    private jobService: JobService,
    private crudJobService: CrudJobDataService
  ) {
    this.loadJobCategories();
  }

  ngOnInit() {
    this.addCategoryForm = new FormGroup({
      categoryCode: new FormControl(''),
      categoryName: new FormControl(''),
      description: new FormControl(''),
    });

    this.addPositionForm = new FormGroup({
      positionCode: new FormControl(''),
      positionName: new FormControl(''),
      description: new FormControl(''),
      categoryId: new FormControl(''),
    });

    this.addLocationForm = new FormGroup({
      address: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
    });

    this.addTypeForm = new FormGroup({
      typeName: new FormControl(''),
    });

    this.addDegreeForm = new FormGroup({
      degreeName: new FormControl(''),
      durationInYears: new FormControl(''),
    });

    this.addInstitutionForm = new FormGroup({
      institutionOrSchool: new FormControl(''),
      universityOrBoard: new FormControl(''),
    });
  }

  private loadJobCategories(): void {
    this.jobService.getAllJobCategories().subscribe(
      (res) => {
        this.jobCategories = res.allJobCategory;
        console.log(this.jobCategories);
      },
      (error) => {
        console.error('Error loading job locations:', error);
      }
    );
  }

  addCategory() : void{
    this.crudJobService.addCategory(this.addCategoryForm.value).subscribe(
      (response) => {
        console.log('success : ', response);
        this.addCategoryForm.reset();
      },
      (error) => {
        console.error('Error sending POST request:', error);
      }
    );
  }

  addPosition() {
    console.log(this.addPositionForm.value);
    this.crudJobService.addCategory(this.addPositionForm.value).subscribe(
      (response) => {
        console.log('success : ', response);
        this.addPositionForm.reset();
      },
      (error) => {
        console.error('Error sending POST request:', error);
      }
    );
  }

  addLocation() {
      this.crudJobService.addLocation(this.addPositionForm.value).subscribe(
        (response) => {
          console.log('success : ', response);
          this.addLocationForm.reset();
        },
        (error) => {
          console.error('Error sending POST request:', error);
        }
      );
  }

  addType() {
    this.crudJobService.addTypes(this.addTypeForm.value).subscribe(
        (response) => {
          console.log('success : ', response);
          this.addTypeForm.reset();
        },
        (error) => {
          console.error('Error sending POST request:', error);
        }
      );
  }

  addDegree() {
    this.crudJobService.addDegree(this.addDegreeForm.value).subscribe(
        (response) => {
          console.log('success : ', response);
          this.addDegreeForm.reset();
        },
        (error) => {
          console.error('Error sending POST request:', error);
        }
      );
  }

  addInstitution() {
    this.http
      .post(
        environment.baseURL + 'EducationInstitution/addInstitution',
        this.addInstitutionForm.value
      )
      .subscribe(
        (response) => {
          console.log('success : ', response);
          this.addInstitutionForm.reset();
        },
        (error) => {
          console.error('Error sending POST request:', error);
        }
      );
  }
}
