import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { sideBarData } from './side-bar';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent {
  collapsed = false;
  sideBarData = sideBarData;

  closeSidenav() {
    this.collapsed = false;
  }
  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}
