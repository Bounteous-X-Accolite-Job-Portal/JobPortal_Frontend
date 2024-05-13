import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { candidateExperience } from '../../../Models/ExperienceResponse/candidateExperience';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { Company } from '../../../Models/CompanyResponse/Company';
import { CompanyService } from '../../../Services/Company/company.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-Experience',
  standalone: true,
  imports: [CommonModule,FormsModule ,ReactiveFormsModule],
  templateUrl: './add-Experience.component.html',
  styleUrl: './add-Experience.component.css'
})
export class AddExperienceComponent {

  companies : Company[] = [];

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

  httpService = inject(CompanyService);
  Experience: candidateExperience[] = [];

  save() {
    console.log(this.candidateExperience.value);
    // this.Experience = this.candidateExperience.value;
    // this.httpService.addExperience(this.candidateExperience.value);
  }

  ngOnInit():void{
  this.companies.push({companyId:"null",companyName:"Select Company Name : ",baseUrl:"",companyDescription:"",empId:"",});
  this.loadAllComapnies();
  }

  private loadAllComapnies() : void
  {
    this.httpService.getAllCompanies().subscribe(
      (res) => {
        console.log(res.companies);
        this.companies = this.companies.concat(res.companies);
        console.log(this.companies);
      },
      (error) =>{
        console.log(error);
      }
    );
  }
}
