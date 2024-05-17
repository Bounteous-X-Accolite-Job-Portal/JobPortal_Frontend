import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EducationInstitution } from '../../../Models/EducationInstitutionResponse/EducationInstitution';
import { JobService } from '../../../Services/job.service';
import { CrudJobDataService } from '../../../Services/CrudJobData/crud-job-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crud-institution-data',
  standalone: true,
  imports: [ CommonModule, RouterLink],
  templateUrl: './crud-institution-data.component.html',
  styleUrl: './crud-institution-data.component.css'
})
export class CrudInstitutionDataComponent {
institutions!: EducationInstitution[];

constructor(
  private jobService: JobService,
  private crudJobDataService: CrudJobDataService,
  private toastr: ToastrService
) {}

ngOnInit() {
  // this.loadInstitutions();
}

// private loadInstitutions(): void {
//   this.jobService.getAllInstitutions().subscribe(
//     (res) => {
//       this.degrees = res.degrees;
//       console.log(this.degrees);
//     },
//     (error) => {
//       console.error('Error loading Degrees:', error);
//     }
//   );
// }

deleteByInstitutionId(institutionId: string): void {
  this.crudJobDataService.deleteInstitutionByInstitutionId(institutionId).subscribe(
    (res) => {
      console.log('Institution Deleted!', res);
      // this.loadInstitutions();
      this.toastr.success('Institution Deleted Successfully !!');
    },
    (error) => {
      console.error('Error deleting Institution:', error);
      this.toastr.error('Error', error);
    }
  );
}


}
