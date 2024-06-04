import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Company } from '../../../Models/CompanyResponse/Company';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CrudJobDataService } from '../../../Services/CrudJobData/crud-job-data.service';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { RouterLink } from '@angular/router';
import { SpinnerService } from '../../../Services/spinner.service';

@Component({
  selector: 'app-crud-company-data',
  standalone: true,
  imports: [ CommonModule, RouterLink, ToastrModule],
  templateUrl: './crud-company-data.component.html',
  styleUrl: './crud-company-data.component.css'
})
export class CrudCompanyDataComponent {
companies!: Company[];
constructor(
  private candidateService: CandidateService,
  private crudJobDataService: CrudJobDataService,
  private toastr: ToastrService,
  private spinnerService : SpinnerService
) {}

ngOnInit() {
  this.loadCompanies();
}

private loadCompanies(): void {
  this.spinnerService.showSpinner();
  this.candidateService.getAllCompanies().subscribe(
    (res) => {
      
      this.companies = res.companies;
      
      this.spinnerService.hideSpinner();
    },
    (error) => {
      // console.error('Error loading Companies:', error);
      this.toastr.error("Error loading Companies: ", error);
      this.spinnerService.hideSpinner();
    }
  );
}

deleteByCompanyId(companyId?: string): void {
  this.crudJobDataService
    .deleteCompanyByCompanyId(companyId)
    .subscribe(
      (res) => {
        // console.log('Company Deleted!', res);
        this.loadCompanies();
        this.toastr.success('Company Deleted Successfully!');
      },
      (error) => {
        // console.error('Error deleting Company:', error);
        this.toastr.error('Error', error);
      }
    );
}
}
