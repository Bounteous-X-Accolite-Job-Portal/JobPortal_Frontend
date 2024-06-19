import { Component, Input, OnInit } from '@angular/core';
import { interviewCardData } from '../../../Models/InterviewResponse/InterviewCardData';
import { CommonModule } from '@angular/common';
import { ExperienceWithCompany } from '../../../Models/ExperienceResponse/ExperienceWithCompany';
import { forkJoin } from 'rxjs';
import { SkillsServiceService } from '../../../Services/Skills/skills-service.service';
import { ExperienceServiceService } from '../../../Services/Experience/experience-service.service';
import { CompanyService } from '../../../Services/Company/company.service';
import { Skills } from '../../../Models/SkillsResponse/Skills';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { InterviewFeedbackService } from '../../../Services/InterviewFeedback/interview-feedback.service';
import { AddInterviewFeedbackResponse } from '../../../Models/InterviewFeedback/AddInterviewFeedbackResponse';
import { RouterModule } from '@angular/router';
import { SpinnerService } from '../../../Services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-interview-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './interview-card.component.html',
  styleUrl: './interview-card.component.css',
})
export class InterviewCardComponent implements OnInit {
  @Input() interview!: interviewCardData;
  @Input() doneInterview!: boolean;

  form!: FormGroup;
  submitting = false;
  submitted = false;

  skills?: Skills;
  experience: ExperienceWithCompany[] = [];

  constructor(
    private skillService: SkillsServiceService,
    private experienceService: ExperienceServiceService,
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private interviewFeedbackService: InterviewFeedbackService,
    private spinnerService: SpinnerService,
    private toastr: ToastrService,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      rating: [0, [Validators.required]],
      feedback: ['', [Validators.required, Validators.minLength(50)]],
      additionalLink: [''],
    });

    this.breakpointObserver
      .observe(['(max-width: 481px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          document.getElementById("verticallyCentered")?.classList.add("modal-dialog-centered");
          document.getElementById("verticalCenter")?.classList.add("modal-dialog-centered");
        }
      });
  }

  newFeedback() {
    // console.log('show spinner');
    this.spinnerService.showSpinner();

    this.form.reset();
    this.submitted = false;

    // console.log('hide spinner');
    this.spinnerService.hideSpinner();
  }

  formClosed() {
    // console.log('show spinner');
    this.spinnerService.showSpinner();

    this.submitted = false;
    this.form.reset();

    // console.log('hide spinner');
    this.spinnerService.hideSpinner();
  }

  get f() {
    return this.form.controls;
  }

  submitFeedback() {
    this.submitting = true;
    this.submitted = true;

    if (this.form.invalid) {
      this.submitted = false;
      return;
    } else {
      const feedbackData = {
        interviewId: this.interview.interviewId,
        rating: this.form.value.rating,
        feedback: this.form.value.feedback,
        additionalLink: this.form.value.additionalLink,
      };

      // console.log('feedback form data ', feedbackData);

      this.interviewFeedbackService.addFeedback(feedbackData).subscribe(
        (data: AddInterviewFeedbackResponse) => {
          // console.log('Status', data.status, 'data message', data.message);
          this.submitting = false;

          if(data.status === 200){
            this.toastr.success('Feedback added successfully!');
          }
          else{
            this.toastr.error(data.message);
          }
        },
        (error) => {
          // console.log(error);
          this.toastr.error('Error: ', error);
          this.submitted = false;
        }
      );
    }

    this.submitted = false;
    this.form.reset();
  }

  ShowDetails(candidateId: string) {
    this.skills;
    this.experience = [];

    forkJoin({
      skills: this.skillService.getSkillsByCandidateId(candidateId.toString()),
      experienceResponse: this.experienceService.getExperienceByCandidateId(
        candidateId.toString()
      ),
    }).subscribe(
      (result) => {
        this.skills = result.skills.skills;

        forkJoin(
          result.experienceResponse.experiences.map((element) =>
            this.companyService.getCompanyById(element.companyId.toString())
          )
        ).subscribe(
          (companies) => {
            result.experienceResponse.experiences.forEach(
              (element, index: number) => {
                const company = companies[index];
                // console.log("com", company)

                let item: ExperienceWithCompany = {
                  experienceTitle: element.experienceTitle,
                  startDate: element.startDate,
                  endDate: element.endDate,
                  isCurrentlyWorking: element.isCurrentlyWorking,
                  description: element.description,
                  Company: companies[index].company,
                };

                this.experience.push(item);
              }
            );

            // console.log("Experience : ", this.experience);
          },
          (error) => {
            this.toastr.error('Error in company API', error);
          }
        );
      },
      (error) => {
        this.toastr.error('Error :', error);
        // console.error(error);
      }
    );
  }
}
