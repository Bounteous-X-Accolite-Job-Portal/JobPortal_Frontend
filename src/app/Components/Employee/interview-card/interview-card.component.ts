import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { interviewCardData } from '../../../Models/InterviewResponse/InterviewCardData';
import { CommonModule } from '@angular/common';
import { Guid } from 'guid-typescript';
import { ExperienceWithCompany } from '../../../Models/ExperienceResponse/ExperienceWithCompany';
import { forkJoin } from 'rxjs';
import { SkillsServiceService } from '../../../Services/Skills/skills-service.service';
import { ExperienceServiceService } from '../../../Services/Experience/experience-service.service';
import { CompanyService } from '../../../Services/Company/company.service';
import { Skills } from '../../../Models/SkillsResponse/Skills';

@Component({
  selector: 'app-interview-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interview-card.component.html',
  styleUrl: './interview-card.component.css'
})
export class InterviewCardComponent implements OnInit {
  @Input() interview !: interviewCardData
  @Input() doneInterview !: boolean;

  skills ?: Skills;
  experience : ExperienceWithCompany[] = []

  constructor(
    private skillService: SkillsServiceService,
    private experienceService: ExperienceServiceService,
    private companyService: CompanyService,
  ){}

  ngOnInit(): void {

  }

  ShowDetails(candidateId: Guid){
    this.skills;
    this.experience = []

    // this.skillService.getSkillsByCandidateId(candidateId.toString()).subscribe((ele) => {
    //   this.skills = ele.skills;
    // })
    
    // this.experienceService.getExperienceByCandidateId(candidateId.toString()).subscribe(result => {
    //   let observableBatch: Observable<CompanyResponse>[] = [];

    //   result.experiences.forEach((exp) => {
    //     observableBatch.push(this.companyService.getCompanyById(exp.companyId.toString()));
    //   });
      
    //   let count : number = 0;
    //   forkJoin(observableBatch).subscribe((companyResponse) => {
    //     let element = result.experiences[count];

    //     let item: ExperienceWithCompany = {
    //         experienceTitle: element.experienceTitle,
    //         startDate: element.startDate,
    //         endDate: element.endDate,
    //         isCurrentlyWorking: element.isCurrentlyWorking,
    //         description: element.description,
    //         Company: companyResponse[count].Company
    //     }

    //     this.experience.push(item);
    //   })
    // });

    forkJoin({
      skills : this.skillService.getSkillsByCandidateId(candidateId.toString()),
      experienceResponse : this.experienceService.getExperienceByCandidateId(candidateId.toString()),
    }).subscribe(
      (result)=> {
        
        this.skills = result.skills.skills;

        forkJoin(
          (result.experienceResponse.experiences).map(element =>
            this.companyService.getCompanyById(element.companyId.toString()),
          )
        ).subscribe(
          (companies) => {
            let count = 0;

            (result.experienceResponse.experiences).forEach((element, index: number) => {
                  
              const company = companies[index];
              console.log("com", company)
                  
              let item: ExperienceWithCompany = {
                  experienceTitle: element.experienceTitle,
                  startDate: element.startDate,
                  endDate: element.endDate,
                  isCurrentlyWorking: element.isCurrentlyWorking,
                  description: element.description,
                  Company: companies[index].company
              }
              
              this.experience.push(item);
              // if(companies[index] != null){
                
              //   console.log("item", item);
              // }
              
              count++
            });
            
            console.log("Experience : ", this.experience);
          },
          (error) => {
              console.log("Error in company API", error);
          }
        )

        // (result.experienceResponse.experiences).forEach(element => {
        //   this.companyService.getCompanyById(element.companyId.toString())
        //   .subscribe((company) => {
        //       console.log("company", company);
            
        //       let item : ExperienceWithCompany = {
        //         experienceTitle : element.experienceTitle,
        //         startDate : element.startDate,
        //         endDate : element.endDate,
        //         isCurrentlyWorking : element.isCurrentlyWorking,
        //         description : element.description,
        //         Company : company.Company
        //       }
              
        //       this.experience.push(item);
        //     },
        //     (error) =>{
        //       console.log("error in company api", error);
        //     }
        //   )
        // });
      },
      (error)=> {
        console.error(error);
      }
    )

    // console.log("Skills : ", this.skills);
    // console.log("Experience : ", this.experience);
  }

}
