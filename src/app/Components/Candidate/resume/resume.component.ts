import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Resume } from '../../../Models/ResumeResponse/Resume';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {
resumeArr: Resume[]= [];
resumeExists: boolean = true;
onDel() {
  this.resumeArr.pop();
}
add() {
  this.resumeExists=!this.resumeExists;
  // if(this.resumeArr.length==3) console.log("Already full list of resume");
  // else this.resumeArr.push({resumeId:"1", resumeUrl: "link input", candidateId: "candidateId"});
}

}
