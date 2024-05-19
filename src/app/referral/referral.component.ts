import { Component } from '@angular/core';
import { ReferralServiceService } from '../referral-service.service';
import { Referral } from '../referral';
import { JobService } from '../Services/Job/job.service';
import { Job } from '../Models/JobResponse/Job';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-referral',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './referral.component.html',
  styleUrl: './referral.component.css'
})
export class ReferralComponent {
  
  jobs: Job[] = [];
  // jobId:string='';
  value: any;
  constructor(private referalService: ReferralServiceService,
    private jobService:JobService,
    private router:Router
  ) { }

  ngOnInit():void{
    this.loadJobs();
  }


  private loadJobs():void{
    this.jobService.getAllJobs().subscribe(
      (res) => {
        this.jobs = res.allJobs;
        // this.value=this.jobId;
        console.log(this.value);
        console.log(this.jobs);
      },
      (error) => {
        console.error('Error loading Jobs',error);
      }
    );
  }

  addrefrral(jobId:string) {
    console.log("passed jobId ; ",jobId);
    this.jobService.jobId =jobId;
    console.log("serice job ; ",this.jobService.jobId);
   this.router.navigate(['employee-dashboard','addReferral']);
  }
  
}



