import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../../Services/spinner.service';
import { ApplicantService } from '../../../Services/Applicants/applicant.service';
import { ApplicantData } from '../../../Models/ApplicantsResponse/ApplicantData';
import { ApplicantCardComponent } from '../applicant-card/applicant-card.component';
import { CommonModule } from '@angular/common';
import { ApplicantResponse } from '../../../Models/ApplicantsResponse/ApplicantResponse';
import { Degree } from '../../../Models/DegreeResponse/Degree';
import { EducationInstitution } from '../../../Models/EducationInstitutionResponse/EducationInstitution';
import { Company } from '../../../Models/CompanyResponse/Company';
import { Status } from '../../../Models/Status';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { StatusService } from '../../../Services/Status/status.service';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';

@Component({
  selector: 'app-job-applicant',
  standalone: true,
  imports: [
    ApplicantCardComponent,
    CommonModule,
    ReactiveFormsModule,
    ToastrModule,
  ],
  templateUrl: './job-applicant.component.html',
  styleUrl: './job-applicant.component.css',
})
export class JobApplicantComponent implements OnInit {
  jobId!: string;
  closedJobId!: string;
  applicants: ApplicantData[] = [];
  filterapplicants: ApplicantData[] = [];

  degrees: Degree[] = [];
  educationInstitutions: EducationInstitution[] = [];
  companies: Company[] = [];
  allStatus: Status[] = [];
  filtersForm!: FormGroup;

  applicantsLength: number = 0;

  constructor(
    private route: ActivatedRoute,
    private spinnerService: SpinnerService,
    private applicantService: ApplicantService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private statusService: StatusService,
    private candidService: CandidateService
  ) {}

  ngOnInit(): void {
    this.getJobId();
    this.getClosedJobId();
    this.loadApplications();
    this.loadAllStatus();
    this.loadAllInstitutions();
    this.loadDegrees();
    this.loadAllComapnies();

    this.filtersForm = this.fb.group({
      degree: [''],
      institute: [''],
      company: [''],
      status: [''],
    });
  }

  getJobId() {
    this.spinnerService.showSpinner();

    this.route.params.subscribe((params) => {
      this.jobId = params['jobId']; // Access the 'id' parameter from the URL
      console.log('Job ID:', this.jobId);

      this.spinnerService.hideSpinner();
    });
  }

  getClosedJobId() {
    this.spinnerService.showSpinner();

    this.route.params.subscribe((params) => {
      this.closedJobId = params['closedJobId']; // Access the 'id' parameter from the URL
      console.log('Closed Job ID:', this.closedJobId);

      this.spinnerService.hideSpinner();
    });
  }

  loadApplications() {
    this.spinnerService.showSpinner();

    if (this.jobId !== undefined) {
      this.applicantService.getApplicantsByJobId(this.jobId).subscribe(
        (res: ApplicantResponse) => {
          console.log('applicants data', res);

          this.applicants = res.applicants;
          this.filterapplicants = this.applicants;
          this.applicantsLength =
            res.applicants == null ? 0 : res.applicants.length;

          this.spinnerService.hideSpinner();
        },
        (error) => {
          console.log(error);
          this.spinnerService.hideSpinner();
        }
      );
    } else {
      this.applicantService
        .getApplicantsByClosedJobId(this.closedJobId)
        .subscribe(
          (res: ApplicantResponse) => {
            console.log('applicants data on closed job', res);

            this.applicants = res.applicants;
            this.applicantsLength =
              res.applicants == null ? 0 : res.applicants.length;

            this.spinnerService.hideSpinner();
          },
          (error) => {
            console.log(error);
            this.spinnerService.hideSpinner();
          }
        );
    }
  }

  private loadAllStatus() {
    this.spinnerService.showSpinner();

    this.statusService.getAllStatus().subscribe(
      (res) => {
        this.allStatus = res.allStatus;

        this.spinnerService.hideSpinner();
        console.log('all status', this.allStatus);
      },
      (error) => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  private loadAllInstitutions(): void {
    this.candidService.getAllInstitutions().subscribe(
      (res) => {
        console.log(res);
        this.educationInstitutions = res.educationInstitution;
        console.log(this.educationInstitutions);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private loadDegrees(): void {
    this.candidService.getAllDegrees().subscribe(
      (res) => {
        this.degrees = res.degrees;
        console.log(this.degrees);
      },
      (error) => {
        console.error('Error loading Degrees:', error);
      }
    );
  }

  private loadAllComapnies(): void {
    this.candidService.getAllCompanies().subscribe(
      (res) => {
        console.log(res.companies);
        this.companies = res.companies;
        console.log(this.companies);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public onSubmit(): void {
    console.log(this.filtersForm.value);

    this.filterJobs(
      this.filtersForm.get('degree')?.value,
      this.filtersForm.get('company')?.value,
      this.filtersForm.get('institute')?.value,
      this.filtersForm.get('status')?.value
    );
  }

  private filterJobs(
    degreeId: string,
    companyId: string,
    instituteId: string,
    statusId: number
  ): void {
    let degreecheck: boolean = false;
    let companycheck: boolean = false;
    let institutecheck: boolean = false;
    let statuscheck: boolean = false;
    
    if (!this.isEmptyId(degreeId)) degreecheck = true;
    if (!this.isEmptyId(companyId)) companycheck = true;
    if (!this.isEmptyId(instituteId)) institutecheck = true;
    if (!this.isEmptyId(statusId)) statuscheck = true;
    
    if(!degreecheck && !companycheck && !institutecheck && !statuscheck)
    {
      this.displayFilterEmptyToast();
      return;
    }
    
    this.filterapplicants = [];
    
    this.applicants.forEach((applicant) => {
      let flg: boolean = true;

      if (degreecheck) {
        let tmp: boolean = false;
        applicant.education.forEach((edu) => {
          if (edu.education.degreeId === degreeId) tmp = true;
        });

        if (!tmp) flg = false;
      }

      if (companycheck) {
        let tmp: boolean = false;
        applicant.experience.forEach((exp) => {
          if (exp.company.companyId === companyId) tmp = true;
        });

        if (!tmp) flg = false;
      }

      if (institutecheck) {
        let tmp: boolean = false;
        applicant.education.forEach((edu) => {
          if (edu.institution.institutionId === instituteId) tmp = true;
        });

        if (!tmp) flg = false;
      }
      
      if (statuscheck) {
        if (applicant.status.statusId != statusId) flg = false;
      }

      if (flg) {
        this.filterapplicants.push(applicant);
      }
    });
    
    if (this.filterapplicants.length > 0) 
      this.displayApplicationToast();
    else 
    {
      this.displayEmptyApplicationToast();
      this.resetFilters();
    }
  }

  private isEmptyId(id: string | number): boolean {
    return id === 'null' || id === '' || id === undefined;
  }

  public resetFilters(): void {
    this.displayResetToast();
    this.ngOnInit();
  }

  private displayFilterEmptyToast(): void {
    this.toastr.error('NO Filter Selected !!');
  }

  private displayApplicationToast(): void {
    this.toastr.success('Applications Found !!');
  }

  private displayResetToast(): void {
    this.toastr.success('Filters Reset Successfully !!');
  }

  private displayEmptyApplicationToast(): void {
    this.toastr.error('No Applications Found !!');
  }
}
