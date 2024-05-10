import { Component, Input } from '@angular/core';
import { Job } from '../../Models/JobResponse/Job';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule , RouterLink , RouterOutlet],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css'
})
export class JobCardComponent {
  @Input() job !: Job;
}
