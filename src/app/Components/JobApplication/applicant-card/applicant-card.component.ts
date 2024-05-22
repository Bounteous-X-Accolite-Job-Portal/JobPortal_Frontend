import { Component, Input, OnInit, inject } from '@angular/core';
import { ApplicantData } from '../../../Models/ApplicantsResponse/ApplicantData';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../../Services/spinner.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Status } from '../../../Models/Status';
import { StatusService } from '../../../Services/Status/status.service';
import { StatusResponse } from '../../../Models/StatusResponse/StatusResponse';
import { ApplicationServiceService } from '../../../Services/ApplicationService/application-service.service';
import { ApplicationResponse } from '../../../Models/ApplicationResponse/ApplicationResponse';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { Guid } from 'guid-typescript';
import { InterviewService } from '../../../Services/InterviewService/interview.service';
import { ApplicantInterviewResponse } from '../../../Models/InterviewResponse/ApplicantInterviewResponse';
import { ApplicantInterview } from '../../../Models/InterviewResponse/ApplicantInterview';
import { Interview } from '../../../Models/InterviewResponse/Interview';
import { StatusModel } from '../../../Models/StatusResponse/StatusModel';
import { AllStatusResponse } from '../../../Models/StatusResponse/AllStatusResponse';

@Component({
  selector: 'app-applicant-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastrModule],
  templateUrl: './applicant-card.component.html',
  styleUrl: './applicant-card.component.css'
})
export class ApplicantCardComponent implements OnInit {
  @Input() applicant !: ApplicantData;

  toaster = inject(ToastrService);

  form !: FormGroup;
  isSubmitted = false;
  statusId : number = 0;

  allStatus : StatusModel[] = [];
  allInterviews : ApplicantInterview[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private statusService: StatusService,
    private applicationService: ApplicationServiceService,
    private interviewService: InterviewService,
  ){}

  ngOnInit() {
    this.form = this.formBuilder.group({
      status: ['', Validators.required],
    });

    this.getAllStatus();
  }

  getAllStatus(){
    this.spinnerService.showSpinner();
    
    this.statusService.getAllStatus().subscribe(
      (res) => {

        this.allStatus = res.allStatus;
        
        this.spinnerService.hideSpinner();
        console.log("all status", this.allStatus);
      },
      (error) => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    )
  }

  get status() {
    return this.form.get('status');
  }

  submitStatus(){
    this.spinnerService.showSpinner();

    this.isSubmitted = true;

    if (!this.form.valid) {
      this.spinnerService.hideSpinner();
      this.isSubmitted = false;
      return;
    } 
    else {
      console.log("newStatusId", this.allStatus[this.statusId]);
      console.log("application Id", this.applicant.applicationId);
      let newStatusId = this.allStatus[this.statusId].statusId;
      
      this.applicationService.changeApplicationStatus(this.applicant.applicationId, newStatusId).subscribe(
        (res: ApplicationResponse) => {
          console.log("change application status response", res)

          this.toaster.success("Successfully changed the application status !");
          
          this.form.reset();
          this.isSubmitted = false;
          this.spinnerService.hideSpinner();

          document.getElementById("closePopUp")?.click();
        },
        (error) => {
          this.toaster.error("Some error occured while changing status. Please try again !");
          console.log(error);
          this.form.reset();
          this.isSubmitted = false;
          this.spinnerService.hideSpinner();
        }
      )

      this.spinnerService.hideSpinner();
    }
  }

  GetAllApplicantInterview(ApplicationId : Guid){
    this.spinnerService.showSpinner();
    this.allInterviews = [];

    this.interviewService.getAllApplicantInterviewsByApplicationId(ApplicationId).subscribe(
      (res : ApplicantInterviewResponse) => {
        console.log("Applicant Interviews", res);

        this.allInterviews = res.allInterviews;

        this.spinnerService.hideSpinner();
        console.log("All interviews", this.allInterviews)
      },
      (error) => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    )
  }

  isActiveInterview(interview: Interview): boolean {
    let dateNow = new Date();
    const yyyy = dateNow.getFullYear();
    const mm = dateNow.getMonth() + 1; // Months start at 0!
    const dd = dateNow.getDate();

    let date = dd + '';
    if (dd < 10) {
      date = '0' + date;
    }

    let month = mm + '';
    if (mm < 10) {
      month = '0' + month;
    }

    const formattedToday = yyyy + '-' + month + '-' + date;

    let timeNow = new Date().toLocaleTimeString();
    timeNow = this.formatto24(timeNow);

    timeNow = timeNow.substring(0, 8);

    let interviewDate = interview.interviewDate.toString();

    let interviewTime = interview.interviewTime.toString();

    if (interviewDate.localeCompare(formattedToday) == -1) {
      return false;
    } 
    else if (interviewDate.localeCompare(formattedToday) == 0) {
      if (interviewTime.localeCompare(timeNow) == -1) {
        return false;
      } 
      else {
        return true;
      }
    } 
    else {
      return true;
    }
  }

  formatto24(timeToConvert : any) {
    let ampm = timeToConvert.split(" ")[1];
    let time = timeToConvert.split(" ")[0];
    if (ampm == "PM") {
      let hours = time.split(":")[0];
      let minutes = time.split(":")[1];
      let seconds = time.split(":")[2];
      let hours24 = JSON.parse(hours) + 12;
      return hours24 + ":" + minutes + ":" + seconds;
    } else {
      return time;
    }
  }

  showInterviewerDetails(){
    document.getElementById("showInterviewerDetails")?.click();
  }
}
