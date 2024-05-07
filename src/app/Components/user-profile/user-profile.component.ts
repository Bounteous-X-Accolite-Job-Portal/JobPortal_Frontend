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

    public email : string = "";

    constructor(
        private userStore : UserStoreService, 
        private auth : AuthService
    ) { }

    ngOnInit(): void {
        this.userStore.getEmailFromStore()
        .subscribe((val) => {
            let emailFromToken = this.auth.getEmailFromToken();
            this.email = val || emailFromToken;
        })
    }

    closeSidenav() {
        this.collapsed=false;
    }
    toggleCollapse() {
        this.collapsed=!this.collapsed;
    }
}
