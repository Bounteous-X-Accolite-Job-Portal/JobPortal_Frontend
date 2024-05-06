import { Component, Inject, Input, inject } from '@angular/core';
import { Job } from '../../Models/JobResponse/Job';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../Services/job.service';
import { cwd } from 'process';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {
  jobdata: Job | undefined;
  route: ActivatedRoute = inject(ActivatedRoute);
  
  constructor(private jobService: JobService) {
    this.fetchJob();
  }


  private fetchJob():void{
    const jobId = String(this.route.snapshot.params['jobId']);
    console.log(jobId);
    
    this.jobService.getJobById(jobId).subscribe(
      (res) => {
        this.jobdata = res;
        console.log("response : "+res);
      },
      (error) =>{
        console.log(error);
      }
    );
  }
}
