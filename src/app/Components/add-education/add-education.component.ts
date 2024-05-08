import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CandidateServicesService } from '../../Services/candidate-services.service';
import { candidateEducation } from '../../Models/candidateEducation';

@Component({
  selector: 'app-add-education',
  standalone: true,
  imports: [FormsModule ,ReactiveFormsModule],
  templateUrl: './add-education.component.html',
  styleUrl: './add-education.component.css'
})
export class AddEducationComponent {

  formBuilder = inject(FormBuilder);
  candidateEducation = this.formBuilder.group({
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
  Education: candidateEducation[] = [];

  save() {
    console.log(this.candidateEducation.value);
    // this.Education = this.candidateEducation.value;
    // this.httpService.addEducation(this.candidateEducation.value);
  }


}
