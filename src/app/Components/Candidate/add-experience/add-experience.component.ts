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
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-Experience',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule , ToastrModule, RouterLink],
  templateUrl: './add-experience.component.html',
  styleUrl: './add-experience.component.css',
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

  constructor(private toastr : ToastrService , private router:Router) {}

  ngOnInit(): void {
    this.loadAllComapnies();
  }

  get f() {
    return this.candidateExperience.controls;
  }

  private loadAllComapnies(): void {
    this.httpService.getAllCompanies().subscribe(
      (res) => {
        // console.log(res.companies);
        this.companies = this.companies.concat(res.companies);
        // console.log(this.companies);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public displayinfo() : void{
    // console.log(this.candidateExperience.value);
    this.addExperience();
  }

  public addExperience() : void{
      this.candidateService.addCandidateExperience(this.candidateExperience.value).subscribe(
        (res) => {
          // console.log("exp response : ",res);
          this.toastr.success("Experience Added Successfully!!");
          this.router.navigate(['profile','exp']);
        },
        (error) => {
          console.log(error);
        }
    )
  };
}
