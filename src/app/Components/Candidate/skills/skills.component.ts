import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Skills } from '../../../Models/SkillsResponse/Skills';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { AuthService } from '../../../Services/auth.service';
import { UserStoreService } from '../../../Services/user-store.service';
import { SpinnerService } from '../../../Services/spinner.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {

  revert() {
    this.ngOnInit();
  }

  constructor(
    private candidService: CandidateService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private spinner: SpinnerService
  ) { }

  userId: string = '';
  skillForm!: FormGroup;
  userSkills!: Skills;
  arrayOfSkills: string[] = [];
  displayFields: boolean = false;
  skillExist: boolean = false;

  ngOnInit(): void {
    this.userStore.getIdFromStore().subscribe((val) => {
      // console.log(val);
      let idFromToken = this.auth.getIdFromToken();
      // console.log(idFromToken);
      this.userId = val || idFromToken;
      // console.log('Logged User Id : ', this.userId);
    });

    this.skillForm = this.fb.group({
      candidateSkills: ['',Validators.required],
    });

    this.loadCandidateSkills();
    this.displayFields = false;
  }

  private loadCandidateSkills(): void {
    this.spinner.showSpinner();
    this.candidService.getSkillsOfCandidate(this.userId).subscribe(
      (res) => {
        this.userSkills = res.skills;
        this.checkCandidateSkills();
        // console.log("skills : ",this.userSkills);
        // console.log("skl : ",this.userSkills.candidateSkills);
        // this.toastr.success("Skills retrieved");
        this.spinner.hideSpinner();
        // this.skillForm.get('candidateSkills')?.setValue(this.userSkills.candidateSkills || '');
      },
      (error) => {
        this.toastr.error('Error in fetching skills');
        this.spinner.hideSpinner();
        console.log(error);
      }
    );
  }

  private checkCandidateSkills() {
    if (this.userSkills == null) {
      this.userSkills = { candidateSkills: '' };
      this.skillExist = false;
    } else {
      this.skillExist = true;
      this.displayskills();
    }
  }

  private displayskills(): void {
    this.arrayOfSkills = this.userSkills.candidateSkills.split(',');
    //this.arrayOfSkills = this.skillForm.get('skills')?.value.split(",");
    // console.log(this.arrayOfSkills);
  }

  public addskills(): void {
    console.log('forms value : ', this.skillForm.value);
    this.candidService
      .addSkilsOfCandidate(this.skillForm.get('candidateSkills')?.value)
      .subscribe(
        (res) => {
          // console.log(res);
          // this.ngOnInit();
          this.toastr.success('Skills Added !!');
        },
        (error) => {
          console.log(error);
        }
      );
  }

  public updateskills(): void {
    this.userSkills.candidateSkills = this.userSkills.candidateSkills.concat(
      ',',
      this.skillForm.value.candidateSkills
    );
    console.log(this.userSkills);
    this.candidService.updateSkillsOfCandidate(this.userSkills).subscribe(
      (res) => {
        // console.log(res);
        this.loadCandidateSkills();
        this.toastr.success('Skills Updated!!');
      },
      (error) => {
        console.log(error);
      }
    );
    }
    
    public newUpdateSkills():void{
    this.candidService.updateSkillsOfCandidate(this.userSkills).subscribe(
      (res) => {
        // console.log(res);
        this.loadCandidateSkills();
        this.toastr.success('Skills Updated!!');
      },
      (error) => {
        console.log(error);
      }
    );

  }

  public enableFields(): void {
    this.displayFields = true;
  }

  public displayValues(): void {
    console.log(this.skillForm.value);
    console.log(this.skillForm.get('skills')?.value);
    this.displayskills();
  }

  public deleteSkill(index: number): void{
    console.log(this.arrayOfSkills[index]);
    // console.log(this.arrayOfSkills);
    if (index > -1) { 
    this.arrayOfSkills.splice(index, 1); 
    }
    this.userSkills.candidateSkills=this.arrayOfSkills.toString();
    
    // console.log(this.userSkills);
    this.newUpdateSkills();
  }
}
