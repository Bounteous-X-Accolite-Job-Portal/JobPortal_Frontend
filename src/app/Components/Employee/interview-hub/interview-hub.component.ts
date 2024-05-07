import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-interview-hub',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './interview-hub.component.html',
  styleUrl: './interview-hub.component.css'
})
export class InterviewHubComponent {


feedbackForm = new FormGroup({
  feedback : new FormControl('',Validators.required)
});


}
