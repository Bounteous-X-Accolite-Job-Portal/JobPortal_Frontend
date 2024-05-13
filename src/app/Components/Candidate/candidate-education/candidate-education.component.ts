import { Component, inject } from '@angular/core';
import { candidateEducation } from '../../../Models/EducationResponse/candidateEducation';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AllCandidateEducation } from '../../../Models/EducationResponse/AllCandidateEducation';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';


@Component({
  selector: 'app-candidate-education',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterModule],
  templateUrl: './candidate-education.component.html',
  styleUrl: './candidate-education.component.css'
})
export class CandidateEducationComponent {
  route:ActivatedRoute=inject(ActivatedRoute);
  eduList : candidateEducation[] = [];
  httpService=inject(CandidateService);

  userId=String(this.route.snapshot.params['id']);
  constructor(){

    this.httpService.getAllcandidateEducation(this.userId).subscribe(
      (res : AllCandidateEducation ) =>{
      //  console.log(res);
        this.eduList = res.candidateEducation;
        console.log(this.eduList);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  addE() {
    // this.pageRender=!this.pageRender;
    this.eduList.push({grade:"A" ,institutionOrSchoolName:'abcd',startYear:2018,endYear:2025,degree:'chal'});
  }
  onDel() {
    this.eduList.pop();
  }


}
