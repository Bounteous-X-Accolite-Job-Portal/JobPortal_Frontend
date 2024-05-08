import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { navbarData } from './nav-data';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-user-profile',
    standalone: true,
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.css',
    imports: [RouterOutlet, RouterModule, CommonModule]
})
export class UserProfileComponent {

    id:string = 'f0f253e3-d28d-4d05-9909-a95804d93cea';
    collapsed = false;
    navData = navbarData;

    closeSidenav() {
        this.collapsed=false;
    }
    toggleCollapse() {
        this.collapsed=!this.collapsed;
    }
}
