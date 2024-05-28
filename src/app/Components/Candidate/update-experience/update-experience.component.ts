import { Component, inject } from '@angular/core';
import { FormsModule,ReactiveFormsModule,FormBuilder,Validators,} from '@angular/forms';
import { candidateExperience } from '../../../Models/ExperienceResponse/candidateExperience';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { Company } from '../../../Models/CompanyResponse/Company';
import { CompanyService } from '../../../Services/Company/company.service';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-Experience',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastrModule, RouterLink],
  templateUrl: './update-experience.component.html',
  styleUrl: './update-experience.component.css',
})
export class UpdateExperienceComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  companies: Company[] = [];
  companyIndex: number = 0;
  isWorking: boolean = false;
  formBuilder = inject(FormBuilder);
  updatecandidateExperience = this.formBuilder.group({
    experienceTitle: [''],
    companyId: [''] ,
    description: [''],
    startDate: [null as Date | null],
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
        // console.log(res.companies);
        this.companies = this.companies.concat(res.companies);
        // console.log(this.companies);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public updateExperience(): void {
   this.candidateExperience.companyId = this.updatecandidateExperience.get('companyId')?.value || '';
   this.candidateExperience.experienceTitle = this.updatecandidateExperience.get('experienceTitle')?.value || '';
   this.candidateExperience.description = this.updatecandidateExperience.get('description')?.value || '';
   this.candidateExperience.startDate = this.updatecandidateExperience.get('startDate')?.value || this.candidateExperience.startDate;
   this.candidateExperience.isCurrentlyWorking = this.updatecandidateExperience.get('isCurrentlyWorking')?.value || false;
   this.candidateExperience.endDate =this.updatecandidateExperience.get('endDate')?.value || undefined;
   //this.candidateExperience.endDate =this.candidateExperience.isCurrentlyWorking?(this.updatecandidateExperience.get('endDate')?.value || null):null;
  
  this.candidateService.updateCandidateExperience(this.candidateExperience)
      .subscribe(
        (res) => {
          // console.log('exp response : ', res);
          this.toastr.success('Experience Updated Successfully!!');
          this.router.navigate(['profile', 'exp']);
        },
        (error) => {
          this.toastr.error("Error in updating experience");
          console.log(error);
        }
      );
  }

  private loadCandidateExperience(id:string):void{
    this.candidateService.getCandidateExperience(id).subscribe(
      (res)=>{
        // console.log(res);
        this.candidateExperience = res.experience;
      
        this.updatecandidateExperience.get('experienceTitle')?.setValue(this.candidateExperience.experienceTitle || '');
        this.updatecandidateExperience.get('companyId')?.setValue(this.candidateExperience.companyId || '');
        this.updatecandidateExperience.get('description')?.setValue(this.candidateExperience.description || '');
        this.updatecandidateExperience.get('startDate')?.setValue(this.candidateExperience.startDate || null);
        this.updatecandidateExperience.get('endDate')?.setValue(this.candidateExperience.endDate || null);
        this.updatecandidateExperience.get('isCurrentlyWorking')?.setValue(this.candidateExperience.isCurrentlyWorking);
      },
      (error)=>
      {
        console.log(error);
      }
    )
  }
}
