import { Component } from '@angular/core';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Services/auth.service';
import { UserStoreService } from '../../../Services/user-store.service';
import { JobCardComponent } from '../../job-card/job-card.component';
import { Job } from '../../../Models/JobResponse/Job';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applied-jobs',
  standalone: true,
  imports: [JobCardComponent,CommonModule],
  templateUrl: './applied-jobs.component.html',
  styleUrl: './applied-jobs.component.css'
})
export class AppliedJobsComponent {
  userId: string = "";
  candidateJobs: Job[] = [];

  constructor(
    private candidService : CandidateService,
    private userStore : UserStoreService,
    private auth : AuthService,
    private toastr : ToastrService
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

    this.loadJobApplicationsApplied(this.userId);
    this.loadsAppliedJobs(this.userId);
  }

  private loadJobApplicationsApplied(id:string)
  {
    this.candidService.getAllJobApplicationByCandidate(id).subscribe(
    (res) => {
      console.log(res);
    },
    (error) => {
      console.log(error);
    }
    )
  }
  
  private loadsAppliedJobs(id:string)
  {
    this.candidService.getAllAppliedJobsByCandidate(id).subscribe(
    (res) => {
      this.candidateJobs = res.allJobs;
      console.log(this.candidateJobs);
    },
    (error) => {
      console.log(error);
    }
    )
  }
}
