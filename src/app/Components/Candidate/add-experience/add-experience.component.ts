import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CandidateServicesService } from '../../../Services/candidate-services.service';
import { candidateExperience } from '../../../Models/candidateExperience';

@Component({
  selector: 'app-add-Experience',
  standalone: true,
  imports: [FormsModule ,ReactiveFormsModule],
  templateUrl: './add-Experience.component.html',
  styleUrl: './add-Experience.component.css'
})
export class AddExperienceComponent {

  formBuilder = inject(FormBuilder);
  candidateExperience = this.formBuilder.group({
    experienceId: ['',],
    experienceTitle: ['', Validators.required],
    startDate: [Date, Validators.required],
    endDate: [Date,],
    isCurrentlyWorking: [true],
    description: ['', Validators.required],
    companyId: ['',],
    candidateId: ['',]
  });

  httpService = inject(CandidateServicesService);
  Experience: candidateExperience[] = [];

  save() {
    console.log(this.candidateExperience.value);
    // this.Experience = this.candidateExperience.value;
    // this.httpService.addExperience(this.candidateExperience.value);
  }


}
