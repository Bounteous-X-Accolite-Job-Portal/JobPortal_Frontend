import { Component, inject, OnInit } from '@angular/core';
import { SpinnerService } from '../../../Services/spinner.service';
import { ApplicationServiceService } from '../../../Services/ApplicationService/application-service.service';
import { SuccessfulOfferResponse } from '../../../Models/SuccessfulOffers/SuccessfulOfferResponse';
import { forkJoin } from 'rxjs';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { JobService } from '../../../Services/Job/job.service';
import { ClosedJobServiceService } from '../../../Services/ClosedJob/closed-job-service.service';
import { SuccessfulProfile } from '../../../Models/SuccessfulOffers/SuccessfulProfile';
import { CommonModule } from '@angular/common';
import { SuccessfulOffer } from '../../../Models/SuccessfulOffers/SuccessfulOffer';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-offer-letter',
  standalone: true,
  imports: [CommonModule, ToastrModule],
  templateUrl: './offer-letter.component.html',
  styleUrl: './offer-letter.component.css'
})
export class OfferLetterComponent implements OnInit {
  toaster = inject(ToastrService);

  allProfiles : SuccessfulProfile[] = [];

  constructor(
    private spinnerService: SpinnerService,
    private applicationService: ApplicationServiceService,
    private candidateService: CandidateService,
    private jobService: JobService,
    private closedJob: ClosedJobServiceService
  ) { }

  ngOnInit(): void {
      this.loadSuccessfulOffers();
  }

  loadSuccessfulOffers(){
    this.spinnerService.showSpinner();

    this.applicationService.getAllSuccessfulOffers().subscribe(
      (result : SuccessfulOfferResponse) => {
        console.log("successful job offer", result);

        result.successfulJobApplication.forEach(element => {
          forkJoin({
            candidate : this.candidateService.getCandidateById(element.candidateId.toString()),
            job : this.jobService.getJobById(element.jobId ? element.jobId.toString() : "3fa85f64-5717-4562-b3fc-2c963f66afa6"),
            closedJob: this.closedJob.getClosedJobById(element.closedJobId ? element.closedJobId.toString() : "3fa85f64-5717-4562-b3fc-2c963f66afa6")
          }).subscribe(
            (res)=> {
              console.log("candidate and job of suucessful job offer", res);

              let  profile : SuccessfulProfile = {
                successfulOffer : element,
                candidate : res.candidate.candidate,
                job : res.job.job,
                closedJob : res.closedJob.closedJob
              }

              this.allProfiles.push(profile);
            },
            (error) => {
              console.log(error);
              this.spinnerService.hideSpinner();
            }
          )
        });

        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    )
  }

  generateOfferLetter(successfulOffer : SuccessfulOffer){
    this.spinnerService.showSpinner();

    this.applicationService.generateOfferLetter(successfulOffer.id).subscribe(
      (res)=> {
        if(res.status === 200){
          this.allProfiles = this.removeSuccessfulOfferFromAllSuccessfulOffers(this.allProfiles, successfulOffer);
          this.toaster.success("Successfully generated offer letter.");
          this.spinnerService.hideSpinner();
        }
        else{
          this.toaster.error(res.message);
          this.spinnerService.hideSpinner();
        }
      },
      (error) => {
        console.log(error);
        this.toaster.error("Offer letter could not be generated, please try again !");
        this.spinnerService.hideSpinner()
      }
    )
  }

  removeSuccessfulOfferFromAllSuccessfulOffers(allProfiles : SuccessfulProfile[], toBeRemoved : SuccessfulOffer){
    let newArray : SuccessfulProfile[] = [];

    for (let i = 0; i < allProfiles.length; i++) {
        if (allProfiles[i].successfulOffer.id !== toBeRemoved.id) {
            newArray.push(allProfiles[i]);
        }
    }

    return newArray;
  };
}
