import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InterviewCardComponent } from '../interview-card/interview-card.component';
import { CommonModule } from '@angular/common';
import { GetInterviewsService } from '../../../Services/InterviewService/get-interviews.service';

@Component({
  selector: 'app-interview-hub',
  standalone: true,
  imports: [ReactiveFormsModule, InterviewCardComponent, CommonModule],
  templateUrl: './interview-hub.component.html',
  styleUrl: './interview-hub.component.css'
})
export class InterviewHubComponent implements OnInit {
  public ActiveInterviewToggle : boolean = true;

  constructor(private getInterviewsService : GetInterviewsService){

  }

  ngOnInit(): void {
      // this.loadInterviews();
  }

  ActiveInterview(){
    this.ActiveInterviewToggle = true;
  }

  InterviewDone(){
    this.ActiveInterviewToggle = false;
  }

  // private loadInterviews(): void {
  //   this.getInterviewsService.getAllJobLocations().subscribe(
  //     (res) => {
  //       this.locations = res.allJobLocations;
  //       console.log(this.locations);
  //     },
  //     (error) => {
  //       console.error('Error loading job locations:', error);
  //     }
  //   );
  // }

  feedbackForm = new FormGroup({
    feedback : new FormControl('',Validators.required)
  });


}
