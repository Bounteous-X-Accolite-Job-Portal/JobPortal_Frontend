import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { candidateExperience } from '../../../Models/ExperienceResponse/candidateExperience';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { Company } from '../../../Models/CompanyResponse/Company';
import { CompanyService } from '../../../Services/Company/company.service';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-Experience',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule , ToastrModule],
  templateUrl: './add-Experience.component.html',
  styleUrl: './add-Experience.component.css',
})
export class AddExperienceComponent {
  companies: Company[] = [];
  companyIndex: number = 0;
  isWorking: boolean = false;
  formBuilder = inject(FormBuilder);
  candidateExperience = this.formBuilder.group({
    experienceTitle: ['', Validators.required],
    companyId: [''],
    description: ['', Validators.required],
    startDate: [Date, Validators.required],
    endDate: [Date,null],
    isCurrentlyWorking:[false]
  });

  httpService = inject(CompanyService);
  candidateService = inject(CandidateService);
  Experience: candidateExperience[] = [];

  constructor(private toastr : ToastrService) {}

  ngOnInit(): void {
    this.companies.push({
      companyId: 'null',
      companyName: 'Select Company Name : ',
      baseUrl: '',
      companyDescription: '',
      empId: '',
    });
    this.loadAllComapnies();
  }

  private loadAllComapnies(): void {
    this.httpService.getAllCompanies().subscribe(
      (res) => {
        console.log(res.companies);
        this.companies = this.companies.concat(res.companies);
        console.log(this.companies);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public displayinfo() : void{
    console.log(this.candidateExperience.value);
    this.addExperience();
  }

  public addExperience() : void{
      this.candidateService.addCandidateExperience(this.candidateExperience.value).subscribe(
        (res) => {
          console.log("exp response : ",res);
          this.toastr.success("Experience Added Successfully!!");
        },
        (error) => {
          console.log(error);
        }
    )
  };
}
