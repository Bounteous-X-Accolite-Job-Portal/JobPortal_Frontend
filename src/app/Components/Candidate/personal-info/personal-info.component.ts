import { Component } from '@angular/core';
import { Candidate } from '../../../Models/Backend/Candidate';
import { UserStoreService } from '../../../Services/user-store.service';
import { AuthService } from '../../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { SpinnerService } from '../../../Services/spinner.service';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent {
  cand!: Candidate;
  userId: string = "";
  userName: string = "";

  constructor(
    private userStore : UserStoreService,
    private auth : AuthService,
    private toastr : ToastrService,
    private fb: FormBuilder,
    private cs: CandidateService,
    private spinnerService: SpinnerService,
  ) {}


  ngOnInit() : void{
    this.loadCandidateId();
    this.loadCandidateInfo();
  }

  loadCandidateId(){
    this.spinnerService.showSpinner();

    this.userStore.getIdFromStore()
    .subscribe((val) => {
      console.log(val);
      let idFromToken = this.auth.getIdFromToken();
      console.log(idFromToken);
      this.userId = val || idFromToken;
      console.log("Logged User Id : ",this.userId);

      this.spinnerService.hideSpinner();
    })

  }

  loadCandidateInfo(){
    this.spinnerService.showSpinner();

      this.cs.getCandidateById(this.userId).subscribe(
        (res) => {
          console.log(res);
          this.cand=res.candidate;
          this.toastr.success("Candidate data loaded");
          this.spinnerService.hideSpinner();
        },
        (error) => {
          console.log(error);        
          this.toastr.error("Error in retrieving data");
          this.spinnerService.hideSpinner();
        }
      )
  } 

}
