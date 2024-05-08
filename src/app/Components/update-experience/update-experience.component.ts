import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CandidateServicesService } from '../../Services/candidate-services.service';
import { candidateExperience } from '../../Models/candidateExperience';

@Component({
  selector: 'app-update-experience',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './update-experience.component.html',
  styleUrl: './update-experience.component.css'
})
export class UpdateExperienceComponent {
  formBuilder = inject(FormBuilder);
  updateExperience = this.formBuilder.group({
    institutionOrSchoolName: ['', Validators.required],
    grade: ['',Validators.required],
    startYear: ['',Validators.required],
    degree: ['',Validators.required],
    endYear: ['',Validators.required],
    educationalInstitution: ['',[]],
    degreeId: ['',[]],
    candidate: ['',[]],
    candidateId: ['',[]]
  });


  httpService = inject(CandidateServicesService);
  Experience: candidateExperience[] = [];

  save() {
    console.log(this.updateExperience.value);
    // this.Education = this.candidateEducation.value;
    // this.httpService.addEducation(this.candidateEducation.value);
  }
}
