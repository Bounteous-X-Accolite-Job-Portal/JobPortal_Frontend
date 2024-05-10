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
  imports: [RouterOutlet, RouterModule, CommonModule],
})
export class UserProfileComponent implements OnInit {
    collapsed = false;
    navData = navbarData;
    id:string = "";
    public name : string = "User";

    constructor(
        private userStore : UserStoreService, 
        private auth : AuthService
    ) { }

    ngOnInit(): void {
        this.userStore.getNameFromStore()
        .subscribe((val) => {
            console.log(val);
            let nameFromToken = this.auth.getNameFromToken();
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
