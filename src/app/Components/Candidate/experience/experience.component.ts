import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { candidateExperience } from '../../../Models/candidateExperience';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit{
onDel() {
throw new Error('Method not implemented.');
}
addE() {
throw new Error('Method not implemented.');
}
expList: candidateExperience[]=[];

ngOnInit(): void {
    
}

}
