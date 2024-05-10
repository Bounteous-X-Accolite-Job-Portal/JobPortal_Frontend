import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { skills } from '../../../Models/skills';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
add() {
    this.skillArr.push({skillsId:"SkillsID", candidateId: "canID", candidateSkills:"C++"});
}
onDel() {
// throw new Error('Method not implemented.');
  this.skillArr.pop();
}
  skillArr: skills[]=[];
  constructor(){
    this.skillArr.push({skillsId:"SkillsID", candidateId: "canID", candidateSkills:"C++"});
    this.skillArr.push({skillsId:"SkillsID", candidateId: "canID", candidateSkills:"C++"});
    this.skillArr.push({skillsId:"SkillsID", candidateId: "canID", candidateSkills:"C++"});
    this.skillArr.push({skillsId:"SkillsID", candidateId: "canID", candidateSkills:"C++"});
    this.skillArr.push({skillsId:"SkillsID", candidateId: "canID", candidateSkills:"C++"});
    this.skillArr.push({skillsId:"SkillsID", candidateId: "canID", candidateSkills:"C++"});
  }

}
