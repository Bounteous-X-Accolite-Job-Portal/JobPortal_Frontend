import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { navbarData } from './nav-data';
import { CommonModule } from '@angular/common';
import { UserStoreService } from '../../Services/user-store.service';
import { AuthService } from '../../Services/auth.service';

@Component({
    selector: 'app-user-profile',
    standalone: true,
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.css',
    imports: [RouterOutlet, RouterModule, CommonModule]
})
export class UserProfileComponent implements OnInit {
    collapsed = false;
    navData = navbarData;

    public name : string = "";

    constructor(
        private userStore : UserStoreService, 
        private auth : AuthService
    ) { }

    ngOnInit(): void {
        this.userStore.getNameFromStore()
        .subscribe((val) => {
            let emailFromToken = this.auth.getNameFromToken();
            this.name = val || emailFromToken;
        })
    }

    closeSidenav() {
        this.collapsed=false;
    }
    toggleCollapse() {
        this.collapsed=!this.collapsed;
    }
}
