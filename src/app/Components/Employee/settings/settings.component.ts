import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobService } from '../../../Services/Job/job.service';
import { JobCategory } from '../../../Models/JobCategoryResponse/JobCategory';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CrudJobDataService } from '../../../Services/CrudJobData/crud-job-data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../Services/spinner.service';

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
    private jobService: JobService,
    private crudJobService: CrudJobDataService,
    private candidateService: CandidateService,
    private toastr: ToastrService,
    private router: ActivatedRoute,
    private route: Router,
    private spinnerService: SpinnerService
  ) {}

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

  loadJobCategories(){
    this.spinnerService.showSpinner();

    this.jobService.getAllJobCategories().subscribe(
      (res) => {
        this.jobCategories = res.allJobCategory;
        // console.log(this.jobCategories);
        this.spinnerService.hideSpinner();
      },
      (error) => {
        // console.error('Error loading job locations:', error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  addCategory(): void {
    this.spinnerService.showSpinner();

    this.crudJobService.addCategory(this.addCategoryForm.value).subscribe(
      (response) => {
        // console.log('success : ', response);
        if(response.status === 200){
          this.toastr.success('Categories added successfully!');

          this.addCategoryForm.reset();
          document.getElementById('categoryPopUpCloseBtn')?.click();
          this.spinnerService.hideSpinner();

          this.route.navigate(['crud-category-job-data'], { relativeTo: this.router});
        }
        else{
          this.toastr.error(response.message);
          this.spinnerService.hideSpinner();
        }
      },
      (error) => {
        // console.error('Error adding categories:', error);
        this.toastr.error('Error adding categories!');
        this.spinnerService.hideSpinner();
      }
    );
  }

  addPosition() {
    this.spinnerService.showSpinner();

    // console.log(this.addPositionForm.value);
    this.crudJobService.addPosition(this.addPositionForm.value).subscribe(
      (response) => {
        // console.log('success : ', response);
        if(response.status === 200){
          this.toastr.success('Position added successfully!');

          this.addPositionForm.reset();
          document.getElementById('positionPopUpCloseBtn')?.click();
          this.spinnerService.hideSpinner();

          this.route.navigate(['crud-position-job-data'], { relativeTo: this.router});
        }
        else{
          this.toastr.error(response.message);
          this.spinnerService.hideSpinner();
        }
      },
      (error) => {
        // console.error('Error adding positions:', error);
        this.toastr.error('Error adding positions!');
        this.spinnerService.hideSpinner();
      }
    );
  }

  addLocation() {
    this.spinnerService.showSpinner();

    this.crudJobService.addLocation(this.addLocationForm.value).subscribe(
      (response) => {
        // console.log('success : ', response);
        if(response.status === 200){
          this.toastr.success('Location added successfully!');

          this.addLocationForm.reset();
          document.getElementById('locationPopUpCloseBtn')?.click();
          this.spinnerService.hideSpinner();

          this.route.navigate(['crud-location-job-data'], { relativeTo: this.router});
        }
        else{
          this.toastr.error(response.message);
          this.spinnerService.hideSpinner();
        }
      },
      (error) => {
        // console.error('Error adding locations:', error);
        this.toastr.error('Error adding locations!');
        this.spinnerService.hideSpinner();
      }
    );
  }

  addType() {
    this.spinnerService.showSpinner();

    this.crudJobService.addTypes(this.addTypeForm.value).subscribe(
      (response) => {
        // console.log('success : ', response);
        if(response.status === 200){
          this.toastr.success('Job type added successfully!');

          this.addTypeForm.reset();
          document.getElementById('jobTypePopUpCloseBtn')?.click();
          this.spinnerService.hideSpinner();

          this.route.navigate(['crud-types-job-data'], { relativeTo: this.router});
        }
        else{
          this.toastr.error(response.message);
          this.spinnerService.hideSpinner();
        }
      },
      (error) => {
        // console.error('Error adding jobtype:', error);
        this.toastr.error('Error adding Job type!');
        this.spinnerService.hideSpinner();
      }
    );
  }

  addDegree() {
    this.spinnerService.showSpinner();

    this.crudJobService.addDegree(this.addDegreeForm.value).subscribe(
      (response) => {
        // console.log('success : ', response);
        if(response.status === 200){
          this.toastr.success('Degree added successfully!');
          
          this.addDegreeForm.reset();
          document.getElementById('degreePopUpCloseBtn')?.click();
          this.spinnerService.hideSpinner();

          this.route.navigate(['crud-degree-data'], { relativeTo: this.router});
        }
        else{
          this.toastr.error(response.message);
          this.spinnerService.hideSpinner();
        }
      },
      (error) => {
        // console.error('Error adding degree:', error);
        this.toastr.error('Error adding degree!');
        this.spinnerService.hideSpinner();
      }
    );
  }

  addInstitution() {
    this.spinnerService.showSpinner();

    this.candidateService.addInstitution(this.addInstitutionForm.value)
      .subscribe(
        (response) => {
          // console.log('success : ', response);
          if(response.status === 200){
            this.toastr.success('Institution added successfully!');

            this.addInstitutionForm.reset();
            document.getElementById('institutionPopUpCloseBtn')?.click();
            this.spinnerService.hideSpinner();

            this.route.navigate(['crud-institution-data'], { relativeTo: this.router});
          }
          else{
            this.toastr.error(response.message);
            this.spinnerService.hideSpinner();
          }
        },
        (error) => {
          // console.error('Error adding institutions', error);
          this.toastr.error('Error adding Institution!');
          this.spinnerService.hideSpinner();
        }
      );
  }

  addCompany() {
    this.spinnerService.showSpinner();

    this.candidateService.addCompany(this.addCompanyForm.value)
      .subscribe(
        (response) => {
          // console.log('success : ', response);
          if(response.status === 200){
            this.toastr.success('Company added successfully!');
            
            this.addCompanyForm.reset();
            document.getElementById('companyPopUpCloseBtn')?.click();
            this.spinnerService.hideSpinner();

            this.route.navigate(['crud-company-data'], { relativeTo: this.router});
          }
          else{
            this.toastr.error(response.message);
            this.spinnerService.hideSpinner();
          }
        },
        (error) => {
          // console.error('Error adding Companys', error);
          this.toastr.error('Error adding Company!', error);
          this.spinnerService.hideSpinner();
        }
      );
  }

  addStatus(){
    this.spinnerService.showSpinner();

    this.crudJobService.addJobApplicationStatus(this.addStatusForm.value)
    .subscribe(
      (res) =>{
        // console.log(res);
        if(res.status === 200){
          this.toastr.success('Status Added successfully!');

          this.addStatusForm.reset();
          document.getElementById('statusPopUpCloseBtn')?.click();
          this.spinnerService.hideSpinner();

          this.route.navigate(['crud-status-job-data'], { relativeTo: this.router});
        }
        else{
          this.toastr.error(res.message);
          this.spinnerService.hideSpinner();
        }
      },
      (error)=>{
        // console.log(error);
        this.toastr.error("Error Adding Status !");
        this.spinnerService.hideSpinner();
      }

    )
  }
}