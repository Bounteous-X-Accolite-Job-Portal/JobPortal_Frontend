import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { candidateExperience } from '../../../Models/ExperienceResponse/candidateExperience';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { AuthService } from '../../../Services/auth.service';
import { UserStoreService } from '../../../Services/user-store.service';
import { Company } from '../../../Models/CompanyResponse/Company';
import { CompanyService } from '../../../Services/Company/company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit{
  userId: string = "";

constructor(private candidService : CandidateService,    
            private userStore : UserStoreService,
            private auth : AuthService,
            private cmpService : CompanyService,
          private toastr : ToastrService) {}

expList: candidateExperience[]=[];
companyList: Company[] = [];

ngOnInit(): void
{
  this.userStore.getIdFromStore()
    .subscribe((val) => {
      console.log(val);
      let idFromToken = this.auth.getIdFromToken();
      console.log(idFromToken);
      this.userId = val || idFromToken;
      console.log("Logged User Id : ",this.userId);
    })

    this.loadExperienceDetails();
} 

private loadExperienceDetails() : void{
  this.candidService.getAllcandidateExperiences(this.userId).subscribe(
    (res) => {
      console.log(res);
      this.expList = res.experiences;
      console.log("Experience : ",this.expList);
      this.loadCompany();
    },
    (error)=>{
      console.log(error);
    }
  )
}

private loadCompany() : void{
  for(let i=0;i<this.expList.length;i++)
  {
    this.getCompanyById(this.expList[i].companyId);
  }

  console.log(this.companyList);
}

private getCompanyById(companyId?: string) : void{
  this.cmpService.getCompanyById(companyId).subscribe(
    (res) => {
      this.companyList.push(res.company);
    },
    (error) => {
      console.log(error);
    }
  )
}

public deleteExperience(experienceId?:string) {
  this.candidService.deleteExperience(experienceId).subscribe(
    (res) =>{
      console.log(res);
      this.toastr.success("Experience Deleted !!");
      this.ngOnInit();
    },
    (error) =>{
      console.log(error);
    }
  )  
}
}
