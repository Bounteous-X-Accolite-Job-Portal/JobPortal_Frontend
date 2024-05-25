import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobService } from '../../../Services/Job/job.service';
import { JobCategory } from '../../../Models/JobCategoryResponse/JobCategory';
import { RouterLink } from '@angular/router';
import { CrudJobDataService } from '../../../Services/CrudJobData/crud-job-data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ToastrModule],
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
  addCompanyForm!: FormGroup;
  addStatusForm!:FormGroup;
  categoryIndex = 0;

  jobCategories: JobCategory[] = [];
  constructor(
    private http: HttpClient,
    private jobService: JobService,
    private crudJobService: CrudJobDataService,
    private candidateService: CandidateService,
    private toastr: ToastrService
  ) {
    this.loadJobCategories();
  }

  ngOnInit() {
    this.addCategoryForm = new FormGroup({
      categoryCode: new FormControl('',Validators.required),
      categoryName: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
    });

    this.addPositionForm = new FormGroup({
      positionCode: new FormControl('',Validators.required),
      positionName: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      categoryId: new FormControl('',Validators.required),
    });

    this.addLocationForm = new FormGroup({
      address: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
      state: new FormControl('',Validators.required),
      country: new FormControl('',Validators.required),
    });

    this.addTypeForm = new FormGroup({
      typeName: new FormControl('',Validators.required),
    });

    this.addStatusForm = new FormGroup({
      statusName: new FormControl('',Validators.required),
    });

    this.addDegreeForm = new FormGroup({
      degreeName: new FormControl('',Validators.required),
      durationInYears: new FormControl('',Validators.required),
    });

    this.addInstitutionForm = new FormGroup({
      institutionOrSchool: new FormControl('',Validators.required),
      universityOrBoard: new FormControl('',Validators.required),
    });

    this.addCompanyForm = new FormGroup({
      companyName: new FormControl('',Validators.required),
      baseUrl: new FormControl('',Validators.required),
      companyDescription: new FormControl('',Validators.required)
    })
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

  addCategory(): void {
    this.crudJobService.addCategory(this.addCategoryForm.value).subscribe(
      (response) => {
        console.log('success : ', response);
        this.toastr.success('Categories added successfully!');
        this.addCategoryForm.reset();
        document.getElementById('categoryPopUpCloseBtn')?.click();
      },
      (error) => {
        console.error('Error adding categories:', error);
        this.toastr.error('Error adding categories!');
      }
    );
  }

  addPosition() {
    console.log(this.addPositionForm.value);
    this.crudJobService.addPosition(this.addPositionForm.value).subscribe(
      (response) => {
        console.log('success : ', response);
        this.addPositionForm.reset();
        this.toastr.success('Position added successfully!');
        document.getElementById('positionPopUpCloseBtn')?.click();
      },
      (error) => {
        console.error('Error adding positions:', error);
        this.toastr.error('Error adding positions!');
      }
    );
  }

  addLocation() {
    this.crudJobService.addLocation(this.addLocationForm.value).subscribe(
      (response) => {
        console.log('success : ', response);
        this.addLocationForm.reset();
        this.toastr.success('Location added successfully!');
        document.getElementById('locationPopUpCloseBtn')?.click();
      },
      (error) => {
        console.error('Error adding locations:', error);
        this.toastr.error('Error adding locations!');
      }
    );
  }

  addType() {
    this.crudJobService.addTypes(this.addTypeForm.value).subscribe(
      (response) => {
        console.log('success : ', response);
        this.addTypeForm.reset();
        this.toastr.success('Job type added successfully!');
        document.getElementById('jobTypePopUpCloseBtn')?.click();
      },
      (error) => {
        console.error('Error adding jobtype:', error);
        this.toastr.error('Error adding Job type!');
      }
    );
  }

  addDegree() {
    this.crudJobService.addDegree(this.addDegreeForm.value).subscribe(
      (response) => {
        console.log('success : ', response);
        this.addDegreeForm.reset();
        this.toastr.success('Degree added successfully!');
        document.getElementById('degreePopUpCloseBtn')?.click();
      },
      (error) => {
        console.error('Error adding degree:', error);
        this.toastr.error('Error adding degree!');
      }
    );
  }

  addInstitution() {
    this.candidateService.addInstitution(this.addInstitutionForm.value)
      .subscribe(
        (response) => {
          console.log('success : ', response);
          this.addInstitutionForm.reset();
          this.toastr.success('Institution added successfully!');
          document.getElementById('institutionPopUpCloseBtn')?.click();
        },
        (error) => {
          console.error('Error adding institutions', error);
          this.toastr.error('Error adding Institution!');
        }
      );
  }


  addCompany() {
    this.candidateService.addCompany(this.addCompanyForm.value)
      .subscribe(
        (response) => {
          console.log('success : ', response);
          this.addCompanyForm.reset();
          this.toastr.success('Company added successfully!');
          document.getElementById('companyPopUpCloseBtn')?.click();
        },
        (error) => {
          console.error('Error adding Companys', error);
          this.toastr.error('Error adding Company!');
        }
      );
  }

  addStatus(){
    this.crudJobService.addJobApplicationStatus(this.addStatusForm.value)
    .subscribe(
      (res) =>{
        console.log(res);
        this.addStatusForm.reset();
        this.toastr.success('Status Added successfully!');
        document.getElementById('statusPopUpCloseBtn')?.click();
      },
      (error)=>{
        console.log(error);
        this.toastr.error("Error Adding Status !");
      }

    )
  }
}