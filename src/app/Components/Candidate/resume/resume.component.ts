import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Resume } from '../../../Models/ResumeResponse/Resume';
import { UserStoreService } from '../../../Services/user-store.service';
import { AuthService } from '../../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ResumeServiceService } from '../../../Services/ResumeService/resume-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [RouterLink, CommonModule,ReactiveFormsModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {

  userId: string = "";
  resumeExists: boolean =false;
  msg:string="";
  resumeForm! : FormGroup;
  userResume!: Resume;

  resumeUrl : string | undefined = "";
  urlSafe : SafeResourceUrl | undefined;
  str = 'https://www.accolite.com';
  

constructor(
  private resumeService : ResumeServiceService,
  private userStore : UserStoreService,
  private auth : AuthService,
  private toastr : ToastrService,
  private fb: FormBuilder,
  private sanitizer : DomSanitizer
) {}


ngOnInit() : void{
  this.userStore.getIdFromStore()
  .subscribe((val) => {
    console.log(val);
    let idFromToken = this.auth.getIdFromToken();
    console.log(idFromToken);
    this.userId = val || idFromToken;
    console.log("Logged User Id : ",this.userId);
  })


  this.resumeForm = this.fb.group({
    resumeUrl:['']
  });

  this.resumeService.getResumeByCandidateId(this.userId).subscribe(
    (res) => {
      console.log(res);
      this.msg=res.message;
      if(res.resume==null)
      {
        this.toastr.info("Khali hai bhai");
        this.resumeExists=false;
        this.userResume = {"resumeUrl":'',"resumeId":'',"candidateId":''};
      }
      else
      {
        this.toastr.success("Aa gaya resume link");
        this.resumeExists=true;
        this.userResume=res.resume;       
        this.resumeUrl = this.userResume !== undefined ? this.userResume.resumeUrl : "";
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.resumeUrl !== undefined ? this.resumeUrl : "");
      }

      this.resumeForm.get('resumeUrl')?.setValue(this.userResume.resumeUrl || '');
    },
    (error) => {
      console.log(error);
      this.toastr.error("Error aa gayi bhai");
    }
    )
}

onDel() {
  this.resumeExists=!this.resumeExists;
}
add() {
  console.log(this.resumeForm.value);
  this.resumeService.addResumeByCandidateId(this.resumeForm.get('resumeUrl')?.value).subscribe(
    (res) => {
      console.log(res);
      this.toastr.success("Resume link added");
      this.ngOnInit();
    },
    (error)=>{
      console.log("Error in adding resume link", error);
      this.toastr.error("Could not add resume");
    }
  );
}


  update(){
    this.userResume.resumeUrl=this.resumeForm.value;
    console.log(this.resumeForm.value);
    this.resumeService.removeResumeByResumeId(this.userResume.resumeId).subscribe(
      (res)=>{
        console.log(res);
      }
    );
    this.add();
    this.toastr.success("Resume linked updated successfuly");
  }


}
