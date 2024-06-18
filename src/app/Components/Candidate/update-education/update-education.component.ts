import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { candidateEducation } from '../../../Models/EducationResponse/candidateEducation';
import { EducationInstitution } from '../../../Models/InstitutionResponse/EducationInstitution';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { CommonModule } from '@angular/common';
import { Degree } from '../../../Models/DegreeResponse/Degree';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { SpinnerService } from '../../../Services/spinner.service';

@Component({
  selector: 'app-update-education',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule , ToastrModule , RouterLink],
  templateUrl: './update-education.component.html',
  styleUrl: './update-education.component.css',
})
export class UpdateEducationComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  degrees: Degree[] = [];
  updateCandidateEducation!:FormGroup;
  httpService = inject(CandidateService);
  Institutions: EducationInstitution[] = [];
  toastr = inject(ToastrService);

  candidateEducation! : candidateEducation;

constructor(private router:Router , private fb : FormBuilder , private spinner : SpinnerService) {}

  ngOnInit(): void {
    const id = String(this.route.snapshot.params['id']);
    this.loadCandidateEducation(id);
    
    this.Institutions.push({
      institutionId: 'null',
      institutionOrSchool: 'Select Your Institution : ',
      universityOrBoard: '',
      empId: '',
    });
    this.loadAllInstitutions();

    this.degrees.push({
      degreeId: 'null',
      degreeName: 'Select Degree :',
      durationInYears: 0,
    });
    this.loadDegrees();

    this.updateCandidateEducation = this.fb.group({
      institutionOrSchoolName:[''],
      startYear:['', Validators.required],
      endYear:[''],
      grade:['', Validators.required],
      institutionId:[''],
      degreeId:['']
    });
  }

  get f() {
    return this.updateCandidateEducation.controls;
  }

  private loadAllInstitutions(): void {
    this.spinner.showSpinner();
    this.httpService.getAllInstitutions().subscribe(
      (res) => {
        // console.log(res);
        this.Institutions = this.Institutions.concat(res.educationInstitution);
        this.spinner.hideSpinner();
        // console.log(this.Institutions);
      },
      (error) => {
        this.spinner.hideSpinner();
        console.log(error);
      }
    );
  }

  private loadDegrees(): void {
    this.httpService.getAllDegrees().subscribe(
      (res) => {
        this.degrees = this.degrees.concat(res.degrees);
        // console.log(this.degrees);
      },
      (error) => {
        console.error('Error loading Degrees:', error);
      }
    );
  }

  public updateEducation() : void{
    // console.log(this.updateCandidateEducation.value);
    this.candidateEducation.degreeId = this.updateCandidateEducation.get('degreeId')?.value;
    this.candidateEducation.institutionId = this.updateCandidateEducation.get('institutionId')?.value;
    this.candidateEducation.institutionOrSchoolName = this.updateCandidateEducation.get('institutionOrSchoolName')?.value;
    this.candidateEducation.startYear = this.updateCandidateEducation.get('startYear')?.value;
    this.candidateEducation.endYear = this.updateCandidateEducation.get('endYear')?.value;
    this.candidateEducation.grade = this.updateCandidateEducation.get('grade')?.value;

      this.httpService.updateCandiateEducation(this.candidateEducation).subscribe(
        (res) => {
          // console.log(res);
          this.toastr.success("Education Updated Successfully!!");
          this.router.navigate(['profile','edu']);
        },
        (error) => {
          console.log(error);
        }
    )
  };

  private loadCandidateEducation(id:string):void{
    this.httpService.getCandidateEducation(id).subscribe(
      (res)=>{
        // console.log(res);
        this.candidateEducation = res.candidateEducation;

        this.updateCandidateEducation.get('institutionOrSchoolName')?.setValue(this.candidateEducation.institutionOrSchoolName || '');
        this.updateCandidateEducation.get('grade')?.setValue(this.candidateEducation.grade || '');
        this.updateCandidateEducation.get('endYear')?.setValue(this.candidateEducation.endYear || '');
        this.updateCandidateEducation.get('startYear')?.setValue(this.candidateEducation.startYear || '');
        this.updateCandidateEducation.get('degreeId')?.setValue(this.candidateEducation.degreeId || '');
        this.updateCandidateEducation.get('institutionId')?.setValue(this.candidateEducation.institutionId || '');
      },
      (error)=>{
        console.log(error);
      }
    );
  }
}
