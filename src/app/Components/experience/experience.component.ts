import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { candidateExperience } from '../../Models/candidateExperience';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
onDel() {
throw new Error('Method not implemented.');
}
addE() {
throw new Error('Method not implemented.');
}
expList: candidateExperience[]=[];

}
