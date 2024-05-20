import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../../Services/spinner.service';
import { ApplicantService } from '../../../Services/Applicants/applicant.service';
import { ApplicantData } from '../../../Models/ApplicantsResponse/ApplicantData';
import { ApplicantCardComponent } from '../applicant-card/applicant-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-applicant',
  standalone: true,
  imports: [ApplicantCardComponent, CommonModule],
  templateUrl: './job-applicant.component.html',
  styleUrl: './job-applicant.component.css'
})
export class JobApplicantComponent implements OnInit {
  jobId !: string;
  applicants: ApplicantData[] = [];
  applicantsLength : number = 0;

  constructor(
    private route: ActivatedRoute,
    private spinnerService: SpinnerService,
    private applicantService: ApplicantService,
  ) { }

  ngOnInit(): void {
    this.getJobId();
    this.loadApplications();
  }

  getJobId(){
    this.spinnerService.showSpinner();

    this.route.params.subscribe(params => {
      this.jobId = params['jobId']; // Access the 'id' parameter from the URL
      console.log('Job ID:', this.jobId);

      this.spinnerService.hideSpinner();
    });
  }

  loadApplications(){
    this.spinnerService.showSpinner();

    this.applicantService.getApplicantsByJobId(this.jobId).subscribe(
      (res) => {
        console.log("applicants data", res);

        this.applicants = res.applicants;
        this.applicantsLength = res.applicants == null ? 0 : res.applicants.length;

        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    )
  }
}
