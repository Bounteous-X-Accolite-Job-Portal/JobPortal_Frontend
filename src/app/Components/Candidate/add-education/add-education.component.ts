import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { candidateEducation } from '../../../Models/EducationResponse/candidateEducation';
import { EducationInstitution } from '../../../Models/InstitutionResponse/EducationInstitution';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { CommonModule } from '@angular/common';
import { Degree } from '../../../Models/DegreeResponse/Degree';

@Component({
  selector: 'app-add-education',
  standalone: true,
  imports: [CommonModule, FormsModule ,ReactiveFormsModule],
  templateUrl: './add-education.component.html',
  styleUrl: './add-education.component.css'
})
export class AddEducationComponent {
  degrees: Degree[] = [];

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

  httpService = inject(CandidateService);
  Institutions: EducationInstitution[] =[];

  save() {
    console.log(this.candidateEducation.value);
  }

  ngOnInit() : void{
    this.Institutions.push({institutionId:"null",institutionOrSchool:"Select Your Institution : ",universityOrBoard:"",empId:""});
    this.loadAllInstitutions();

    this.degrees.push({degreeId:"null",degreeName:"Select Degree :",durationInYears:0});
    this.loadDegrees();
  }

  private loadAllInstitutions() : void{
    this.httpService.getAllInstitutions().subscribe(
      (res) => {
        console.log(res);
        this.Institutions = this.Institutions.concat(res.educationInstitution);
        console.log(this.Institutions);
      },
      (error) =>
        {
          console.log(error);
        }
    );
  }

  private loadDegrees(): void{
    this.httpService.getAllDegrees().subscribe(
      (res) => {
        this.degrees = this.degrees.concat(res.degrees);
        console.log(this.degrees);
      },
      (error) => {
        console.error('Error loading Degrees:',error);
      }
    )
  }
}
