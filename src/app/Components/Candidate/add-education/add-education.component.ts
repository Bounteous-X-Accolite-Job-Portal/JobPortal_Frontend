import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { EducationInstitution } from '../../../Models/InstitutionResponse/EducationInstitution';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { CommonModule } from '@angular/common';
import { Degree } from '../../../Models/DegreeResponse/Degree';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-education',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule , ToastrModule , RouterLink],
  templateUrl: './add-education.component.html',
  styleUrl: './add-education.component.css',
})
export class AddEducationComponent {
  degrees: Degree[] = [];
  addCandidateEducation!:FormGroup;
  httpService = inject(CandidateService);
  Institutions: EducationInstitution[] = [];
  toastr = inject(ToastrService);

constructor(private router:Router) {}

  ngOnInit(): void {
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

    this.addCandidateEducation = new FormGroup({
      institutionOrSchoolName:new FormControl(""),
      startYear:new FormControl("2020", Validators.required),
      endYear:new FormControl("2022"),
      grade:new FormControl("", Validators.required),
      institutionId:new FormControl("mps"),
      degreeId:new FormControl(""),
    });  
  }

  get f() {
    return this.addCandidateEducation.controls;
  }


  private loadAllInstitutions(): void {
    this.httpService.getAllInstitutions().subscribe(
      (res) => {
        // console.log(res);
        this.Institutions = this.Institutions.concat(res.educationInstitution);
        // console.log(this.Institutions);
      },
      (error) => {
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

  public addEducation() : void{
      this.httpService.addCandidateEducation(this.addCandidateEducation.value).subscribe(
        (res) => {
          this.toastr.success("Education Added Successfully!!");
          this.router.navigate(['profile','edu']);
        },
        (error) => {
          console.log(error);
        }
    )
  };
}
