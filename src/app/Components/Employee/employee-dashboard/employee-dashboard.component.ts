import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { sideBarData } from './side-bar';
import { UserStoreService } from '../../../Services/user-store.service';
import { AuthService } from '../../../Services/auth.service';
import { SpinnerService } from '../../../Services/spinner.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent implements OnInit {
  collapsed = false;
  sideBarData = sideBarData;
  public name : string = "Employee";
  hasPrivilege : boolean = false;
  hasSpecialPrivilege : boolean = false;

  constructor(
    private userStore : UserStoreService, 
    private authService : AuthService,
    private spinnerService : SpinnerService,
  ) { }

  ngOnInit(): void {
    this.userStore.getNameFromStore()
    .subscribe((val) => {
        let nameFromToken = this.authService.getNameFromToken();
        this.name = val || nameFromToken;
    })

    this.checkHasPrivilege();
    this.checkHasSpecialPrivilege();
  }

  checkHasPrivilege(){
    this.spinnerService.showSpinner();

    this.userStore.checkHasPrivilegeFromStore()
    .subscribe((val) => {
        let privilege = this.authService.checkHasPrivilegeFromToken();
        this.hasPrivilege = val || privilege;
    })

    this.spinnerService.hideSpinner();

    console.log("hasPrivilege at emp dash", this.hasPrivilege);
  }

  checkHasSpecialPrivilege(){
    this.spinnerService.showSpinner();

    this.userStore.checkHasSpecialPrivilegeFromStore()
    .subscribe((val) => {
        let specialPrivilege = this.authService.checkHasSpecialPrivilegeFromToken();
        this.hasSpecialPrivilege = val || specialPrivilege;
        this.hasPrivilege  = false;
        this.hasSpecialPrivilege  = false;
    })

    this.spinnerService.hideSpinner();

    console.log("hasSpecialPrivilege at emp dash", this.hasSpecialPrivilege);
  }

  closeSidenav() {
    this.collapsed = false;
  }
  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}
