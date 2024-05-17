import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { sideBarData } from './side-bar';
import { UserStoreService } from '../../../Services/user-store.service';
import { AuthService } from '../../../Services/auth.service';

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

  constructor(
    private userStore : UserStoreService, 
    private authService : AuthService
) { }

  ngOnInit(): void {
    this.userStore.getNameFromStore()
    .subscribe((val) => {
        console.log(val);
        let nameFromToken = this.authService.getNameFromToken();
        console.log(nameFromToken);
        this.name = val || nameFromToken;
        console.log(this.name);
    })
  }

  closeSidenav() {
    this.collapsed = false;
  }
  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}
