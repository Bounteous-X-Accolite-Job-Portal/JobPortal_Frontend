import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InterviewCardComponent } from '../interview-card/interview-card.component';
import { CommonModule, Time } from '@angular/common';
import { GetInterviewsService } from '../../../Services/InterviewService/get-interviews.service';
import { interviewResponse } from '../../../Models/InterviewResponse/InterviewResponse';
import { SpinnerService } from '../../../Services/spinner.service';
import { ApplicationServiceService } from '../../../Services/ApplicationService/application-service.service';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { interviewCardData } from '../../../Models/InterviewResponse/InterviewCardData';
import { Interview } from '../../../Models/InstitutionResponse/Interview';
import { ResumeServiceService } from '../../../Services/ResumeService/resume-service.service';
import { ClosedApplicationService } from '../../../Services/ClosedApplication/closed-application.service';
import { forkJoin } from 'rxjs';
import { ClosedJobServiceService } from '../../../Services/ClosedJob/closed-job-service.service';
import { JobService } from '../../../Services/Job/job.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-interview-hub',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InterviewCardComponent,
    CommonModule,
  ],
  templateUrl: './interview-hub.component.html',
  styleUrl: './interview-hub.component.css',
})
export class InterviewHubComponent implements OnInit {

  public ActiveInterviewToggle: boolean = true;
  interviews: interviewResponse[] = [];
  activeInterviews: interviewCardData[] = [];
  doneInterviews: interviewCardData[] = [];

  constructor(
    private getInterviewsService: GetInterviewsService,
    private spinnerService: SpinnerService,
    private applicationService: ApplicationServiceService,
    private candidateService: CandidateService,
    private resumeService: ResumeServiceService,
    private closedApplicationService: ClosedApplicationService,
    private jobService: JobService,
    private closedJobService : ClosedJobServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadInterviews();
    // console.log('interviews', this.interviews);
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
    // console.log('formattedToday', formattedToday);

    let timeNow = new Date().toLocaleTimeString();
    timeNow = this.formatto24(timeNow);

    timeNow = timeNow.substring(0, 8);
    // console.log('timenow', timeNow);
    // timeNow = timeNow.replaceAll(":", "");
    // console.log('timenow', timeNow);

    let interviewDate = interview.interviewDate.toString();
    // console.log('interview date : ', interviewDate);

    let interviewTime = interview.interviewTime.toString();
    // console.log("interview time-", interviewTime + "-");
    // interviewTime = interviewTime.replaceAll(":", "");
    // console.log("interview time ", interviewTime);

    // console.log("compare date : ", interviewDate.localeCompare(formattedToday));
    // console.log("compare time : ", interviewTime.localeCompare(timeNow));

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

  ActiveInterview() {
    this.ActiveInterviewToggle = true;
  }

  InterviewDone() {
    this.ActiveInterviewToggle = false;
  }

  private loadInterviews(): void {
    // console.log('show spinner');
    this.spinnerService.showSpinner();

    this.getInterviewsService.getAllInterviewsOfLoggedInEmployee().subscribe(
      (res) => {
        // console.log(res);
        this.interviews = res.allInterviews;

        this.interviews.forEach((interview) => {

          if (interview.applicationId !== null) {
            this.applicationService
              .getApplicationsById(interview.applicationId.toString())
              .subscribe((application) => {
                // console.log("application", application);

                forkJoin({
                  candidate : this.candidateService.getCandidateById(application.application.candidateId.toString()),
                  resume : this.resumeService.getResumeByCandidateId(application.application.candidateId.toString()),
                  job : (application.application.jobId != null) ? 
                              this.jobService.getJobById(application.application.jobId.toString()):
                              this.closedJobService.getClosedJobById(application.application.closedJobId.toString()),
                }).subscribe(
                  (results: any) => {
                      let toBeAdded: interviewCardData = {
                        interviewId : interview.interviewId,
                        interviewDate: interview.interviewDate,
                        interviewTime: interview.interviewTime,
                        link: interview.link,
                        feedbackId: interview.feedbackId,
                        Candidate: results.candidate.candidate,
                        Resume: results.resume.resume,
                        Job: (application.application.jobId != null) ? (results.job.job) : null,
                        ClosedJob: (application.application.jobId == null) ? (results.job.closedJob) : null,
                      };
      
                      // console.log("toboadded : ", toBeAdded);
      
                      if (this.isActiveInterview(interview)) {
                        this.activeInterviews.push(toBeAdded);
                        // console.log("is active ");
                      } else {
                        this.doneInterviews.push(toBeAdded);
                      }
                  },
                  (error) => {
                      this.toastr.error('Error in API calls interviewhub : ', error);
                  }
                );
              });
          }
          else{
            this.closedApplicationService
            .getClosedApplicationById(interview.closedApplicationId.toString())
            .subscribe((closedApplication) => {
              // console.log("closedJob", closedApplication);

              forkJoin({
                candidate : this.candidateService.getCandidateById(closedApplication.closedApplication.candidateId.toString()),
                resume : this.resumeService.getResumeByCandidateId(closedApplication.closedApplication.candidateId.toString()),
                job : (closedApplication.closedApplication.jobId != null) ? 
                            this.jobService.getJobById(closedApplication.closedApplication.jobId.toString()):
                            this.closedJobService.getClosedJobById(closedApplication.closedApplication.closedJobId.toString()),
              }).subscribe(
                (results: any) => {
                    let toBeAdded: interviewCardData = {
                      interviewId : interview.interviewId,
                      interviewDate: interview.interviewDate,
                      interviewTime: interview.interviewTime,
                      link: interview.link,
                      feedbackId: interview.feedbackId,
                      Candidate: results.candidate.candidate,
                      Resume: results.resume.resume,
                      Job: (closedApplication.closedApplication.jobId != null) ? (results.job.job) : null,
                      ClosedJob: (closedApplication.closedApplication.jobId == null) ? (results.job.closedJob) : null,
                    };
    
                    // console.log("toboadded : ", toBeAdded);
    
                    if (this.isActiveInterview(interview)) {
                      this.activeInterviews.push(toBeAdded);
                      // console.log("is active ");
                    } else {
                      this.doneInterviews.push(toBeAdded);
                    }
                },
                (error) => {
                    // console.error('Error in API calls interviewhub : ', error);
                    this.toastr.error('Error: ', error);
                }
              );
            });
          }
        });

        // console.log('hide spinner');
        this.spinnerService.hideSpinner();
      },
      (error) => {
        this.spinnerService.hideSpinner();
        this.toastr.error('Error: ', error);
        // console.error('Error loading job locations:', error);
      }
    );
  }

  feedbackForm = new FormGroup({
    feedback: new FormControl('', Validators.required),
  });
}
