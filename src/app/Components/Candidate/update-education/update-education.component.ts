import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { candidateEducation } from '../../../Models/EducationResponse/candidateEducation';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';

@Component({
  selector: 'app-update-education',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './update-education.component.html',
  styleUrl: './update-education.component.css'
})
export class UpdateEducationComponent {
add() {
throw new Error('Method not implemented.');
}
  formBuilder = inject(FormBuilder);
  updateEducation = this.formBuilder.group({
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


  httpService = inject(CandidateService);
  Education: candidateEducation[] = [];

  save() {
    console.log(this.updateEducation.value);
    // this.Education = this.candidateEducation.value;
    // this.httpService.addEducation(this.candidateEducation.value);
  }


}