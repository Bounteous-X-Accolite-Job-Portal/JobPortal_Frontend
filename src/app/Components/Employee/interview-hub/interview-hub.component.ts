import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InterviewCardComponent } from '../interview-card/interview-card.component';
import { CommonModule } from '@angular/common';
import { GetInterviewsService } from '../../../Services/InterviewService/get-interviews.service';
import { interviewResponse } from '../../../Models/InterviewResponse/InterviewResponse';

@Component({
  selector: 'app-interview-hub',
  standalone: true,
  imports: [ReactiveFormsModule, InterviewCardComponent, CommonModule],
  templateUrl: './interview-hub.component.html',
  styleUrl: './interview-hub.component.css'
})
export class InterviewHubComponent implements OnInit {
  public ActiveInterviewToggle : boolean = true;
  interviews : interviewResponse[] = [];

  constructor(private getInterviewsService : GetInterviewsService){

  }

  ngOnInit(): void {
      this.loadInterviews();
  }

  ActiveInterview(){
    this.ActiveInterviewToggle = true;
  }

  InterviewDone(){
    this.ActiveInterviewToggle = false;
  }

  private loadInterviews(): void {
    this.getInterviewsService.getAllInterviewsOfLoggedInEmployee().subscribe(
      (res) => {
        console.log(res);
        this.interviews = res.allInterviews;
      },
      (error) => {
        console.error('Error loading job locations:', error);
      }
    );
  }

  feedbackForm = new FormGroup({
    feedback : new FormControl('',Validators.required)
  });


}
