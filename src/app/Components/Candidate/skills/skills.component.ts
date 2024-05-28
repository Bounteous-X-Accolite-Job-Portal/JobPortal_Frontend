import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Skills } from '../../../Models/SkillsResponse/Skills';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { AuthService } from '../../../Services/auth.service';
import { UserStoreService } from '../../../Services/user-store.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  constructor(
    private candidService: CandidateService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private toastr: ToastrService,
    private fb : FormBuilder
  ) {}

  userId: string ='';

  skillForm!:FormGroup;
  userSkills!: Skills;
  
  arrayOfSkills?:string[] = [];
  displayFields:boolean = false;
  skillExist:boolean = false;

  ngOnInit(): void {
    this.userStore.getIdFromStore().subscribe((val) => {
      // console.log(val);
      let idFromToken = this.auth.getIdFromToken();
      // console.log(idFromToken);
      this.userId = val || idFromToken;
      // console.log('Logged User Id : ', this.userId);
    });

    this.skillForm = this.fb.group({
      candidateSkills:['']
    });
    this.loadCandidateSkills();
    this.displayFields = false;
  }

  private loadCandidateSkills():void{
    this.candidService.getSkillsOfCandidate(this.userId).subscribe(
      (res)=>
        {
          // console.log(res);
          this.userSkills = res.skills;
          this.checkCandidateSkills();
          // console.log("com skills : ",this.userSkills);
          // console.log("skl : ",this.userSkills.candidateSkills);
          this.toastr.success("Skills retrieved");
          this.skillForm.get('candidateSkills')?.setValue(this.userSkills.candidateSkills || '');
        },
      (error)=>
        {
          this.toastr.error("Error in fetching skills");
          console.log(error);
        }
    );
  }

  private checkCandidateSkills(){
    if(this.userSkills==null)
    {
      this.userSkills = {candidateSkills:''};
      this.skillExist=false;
    }
    else
    {
      this.skillExist=true;
      this.displayskills();
    }
  }

  private displayskills() : void{
    this.arrayOfSkills = this.userSkills.candidateSkills.split(",");
    //this.arrayOfSkills = this.skillForm.get('skills')?.value.split(",");
    // console.log(this.arrayOfSkills);
  }


  public addskills() : void{
    console.log("forms value : ",this.skillForm.value);
    this.candidService.addSkilsOfCandidate(this.skillForm.get('candidateSkills')?.value).subscribe(
      (res)=>{
        // console.log(res);
        this.ngOnInit();
        this.toastr.success("Skills Updated !!");
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  
  public updateskills() : void{
    this.userSkills.candidateSkills = this.skillForm.value.candidateSkills;
    this.candidService.updateSkillsOfCandidate(this.userSkills).subscribe(
      (res) =>{
        // console.log(res);
        this.ngOnInit();
        this.toastr.success("Skills Updated !!");
      },
      (error) =>{
        console.log(error);
      }
        
    );
  }

  public enableFields(): void{
    this.displayFields = true;
  }

  public displayValues():void{
    console.log(this.skillForm.value);
    console.log(this.skillForm.get('skills')?.value);
    
    this.displayskills();
  }
}
