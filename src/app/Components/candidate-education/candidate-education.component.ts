import { Component, inject } from '@angular/core';
import { Education } from '../../Models/candidateEducation';
import { CandidateServicesService } from '../../Services/candidate-services.service';
import { CommonModule } from '@angular/common';


const ELEMENT_DATA: Education[] = [
  {Grade: 1, InstitutionOrSchoolName: 'Hydrogen', StartYear: 2017, EndYear: 2020, Degree: 'H'},
  {Grade: 2, InstitutionOrSchoolName: 'Helium', StartYear: 2017, EndYear: 2020, Degree: 'He'},
  {Grade: 3, InstitutionOrSchoolName: 'Lithium', StartYear: 2017, EndYear: 2020,Degree: 'Li'},
  {Grade: 4, InstitutionOrSchoolName: 'Beryllium', StartYear: 2017, EndYear: 2020, Degree: 'Be'},
  {Grade: 5, InstitutionOrSchoolName: 'Boron', StartYear: 2017, EndYear: 2020, Degree: 'B'},
  {Grade: 6, InstitutionOrSchoolName: 'Carbon', StartYear: 2017, EndYear: 2020, Degree: 'C'},
  {Grade: 7, InstitutionOrSchoolName: 'Nitrogen', StartYear: 2017, EndYear: 2020, Degree: 'N'},
  {Grade: 8, InstitutionOrSchoolName: 'Oxygen', StartYear: 2017, EndYear: 2020, Degree: 'O'},
  {Grade: 9, InstitutionOrSchoolName: 'Fluorine', StartYear: 2017, EndYear: 2020, Degree: 'F'},
  {Grade: 10, InstitutionOrSchoolName: 'Neon', StartYear: 2017, EndYear: 2020, Degree: 'Ne'},
];


@Component({
  selector: 'app-candidate-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidate-education.component.html',
  styleUrl: './candidate-education.component.css'
})
export class CandidateEducationComponent {
  eduList = ELEMENT_DATA;
  httpService=inject(CandidateServicesService)
  ngOnInit(){
    this.httpService.getAllEducation().subscribe(result => {
      this.eduList=result;
      console.log(this.eduList);
    })
  }

  // displayedColumns: string[] = ['Grade', 'StartYear', 'EndYear', 'InstitutionOrSchoolName', 'Degree'];
  // dataSource = [...ELEMENT_DATA];


  // addData() {
  //   const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
  //   this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
  //   this.table.renderRows();
  // }

  // removeData() {
  //   this.dataSource.pop();
  //   this.table.renderRows();
  // }


}
