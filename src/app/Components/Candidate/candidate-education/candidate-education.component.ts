import { Component, inject } from '@angular/core';
import { candidateEducation } from '../../../Models/EducationResponse/candidateEducation';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AllCandidateEducation } from '../../../Models/EducationResponse/AllCandidateEducation';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { UserStoreService } from '../../../Services/user-store.service';
import { AuthService } from '../../../Services/auth.service';
import { Degree } from '../../../Models/DegreeResponse/Degree';
import { EducationInstitution } from '../../../Models/InstitutionResponse/EducationInstitution';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  degrees: Degree[] = [];
  institutions : EducationInstitution[] = [];
  httpService=inject(CandidateService);
  emptyEdu:boolean=true;

  userId: string = "";
  constructor(
    private userStore : UserStoreService,
    private auth : AuthService,
    private toastr : ToastrService
  )
  {}

  ngOnInit():void{
    this.loadCandidateEducations();
  }
  
  private loadCandidateEducations() :void
  {
    this.userStore.getIdFromStore()
    .subscribe((val) => {
      // console.log(val);
      let idFromToken = this.auth.getIdFromToken();
      // console.log(idFromToken);
      this.userId = val || idFromToken;
      // console.log("Logged User Id : ",this.userId);
    })
    
    this.httpService.getAllcandidateEducation(this.userId).subscribe(
      (res : AllCandidateEducation ) =>{
        console.log("response",res);
        this.eduList = res.candidateEducation;
        if(this.eduList.length==0) {
          this.emptyEdu=true;
          this.toastr.info("Empty education list");
        }
        else {
          this.emptyEdu=false;
          this.toastr.success("Education retrieved");
        }
        console.log("eulist",this.eduList);
        this.storedata();
      },
      (error) => {
        console.log(error);
      }
    );

    console.log("degrees",this.degrees);
    console.log("institutions",this.institutions);
  }

  private storedata() : void
  {
    for(let i=0;i<this.eduList.length;i++)
      {
        this.addDegree(this.eduList[i].degreeId);
        this.addInstitution(this.eduList[i].institutionId);
      }
  }

  private addDegree(degreeId? : string): void
  {
    console.log("fun call",degreeId);
    this.httpService.getDegreeById(degreeId).subscribe(
      (res) => {
        this.degrees.push(res.degree);
        console.log(res);
      },
      (error) =>{
        console.log(error);
      }
    )
  }
  private addInstitution(institutionId? : string): void
  {
    this.httpService.getInstitutionById(institutionId).subscribe(
      (res) => {
        this.institutions.push(res.educationInstitution);
        console.log(res);
      },
     (error) =>{
        console.log(error);
      }
    )
  }

  deleteEducation(educationId? : string) {
    this.httpService.deleteEducation(educationId).subscribe(
      (res) =>{
        console.log(res);
        this.toastr.success("Education Deleted !!");
        this.ngOnInit();
      },
      (error) =>{
        console.log(error);
      }
    )
  }
}
