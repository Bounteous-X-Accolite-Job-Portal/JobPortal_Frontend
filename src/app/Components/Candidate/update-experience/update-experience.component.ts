import { Component, inject } from '@angular/core';
import { FormsModule,ReactiveFormsModule,FormBuilder,Validators,} from '@angular/forms';
import { candidateExperience } from '../../../Models/ExperienceResponse/candidateExperience';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { Company } from '../../../Models/CompanyResponse/Company';
import { CompanyService } from '../../../Services/Company/company.service';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-Experience',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastrModule],
  templateUrl: './update-Experience.component.html',
  styleUrl: './update-Experience.component.css',
})
export class UpdateExperienceComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  companies: Company[] = [];
  companyIndex: number = 0;
  isWorking: boolean = false;
  formBuilder = inject(FormBuilder);
  updatecandidateExperience = this.formBuilder.group({
    experienceTitle: ['', Validators.required],
    companyId: [''],
    description: ['', Validators.required],
    startDate: [null as Date | null, Validators.required],
    endDate: [null as Date | null],
    isCurrentlyWorking: [false],
  });

  httpService = inject(CompanyService);
  candidateService = inject(CandidateService);
  candidateExperience!: candidateExperience;

  constructor(private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    const id = String(this.route.snapshot.params['id']);
    this.loadCandidateExperience(id);

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

  public updateExperience(): void {
    this.candidateService.updateCandidateExperience(this.candidateExperience)
      .subscribe(
        (res) => {
          console.log('exp response : ', res);
          this.toastr.success('Experience Updated Successfully!!');
          this.router.navigate(['profile', 'exp']);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  private loadCandidateExperience(id:string):void{
    this.candidateService.getCandidateExperience(id).subscribe(
      (res)=>{
        console.log(res);
        this.candidateExperience = res.experience;
      
        this.updatecandidateExperience.get('experienceTitle')?.setValue(this.candidateExperience.experienceTitle || '');
        this.updatecandidateExperience.get('companyId')?.setValue(this.candidateExperience.companyId || '');
        this.updatecandidateExperience.get('description')?.setValue(this.candidateExperience.description || '');
        this.updatecandidateExperience.get('startDate')?.setValue(this.candidateExperience.startDate || Date.now());
        this.updatecandidateExperience.get('endDate')?.setValue(this.candidateExperience.endDate || Date.now());
      },
      (error)=>
      {
        console.log(error);
      }
    )
  }
}
