import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EducationInstitution } from '../../../Models/EducationInstitutionResponse/EducationInstitution';
import { CrudJobDataService } from '../../../Services/CrudJobData/crud-job-data.service';
import { ToastrService } from 'ngx-toastr';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';

@Component({
  selector: 'app-crud-institution-data',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './crud-institution-data.component.html',
  styleUrl: './crud-institution-data.component.css',
})
export class CrudInstitutionDataComponent {
  institutions!: EducationInstitution[];

  constructor(
    private candidateService: CandidateService,
    private crudJobDataService: CrudJobDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadInstitutions();
  }

  private loadInstitutions(): void {
    this.candidateService.getAllInstitutions().subscribe(
      (res) => {
        this.institutions = res.educationInstitution;
        console.log(this.institutions);
      },
      (error) => {
        console.error('Error loading Institutions:', error);
      }
    );
  }

  deleteByInstitutionId(institutionId: string): void {
    this.crudJobDataService
      .deleteInstitutionByInstitutionId(institutionId)
      .subscribe(
        (res) => {
          console.log('Institution Deleted!', res);
          this.loadInstitutions();
          this.toastr.success('Institution Deleted Successfully!');
        },
        (error) => {
          console.error('Error deleting Institution:', error);
          this.toastr.error('Error', error);
        }
      );
  }
}
