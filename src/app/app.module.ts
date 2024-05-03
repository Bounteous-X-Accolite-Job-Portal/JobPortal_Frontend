import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './Services/CandidateAuthentication/auth.service';
import { AddEmployeeService } from './Services/AddEmployee/add-employee.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService, AddEmployeeService],
})
export class AppModule {}
