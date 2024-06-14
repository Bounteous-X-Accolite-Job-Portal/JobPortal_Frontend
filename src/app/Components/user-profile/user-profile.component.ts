import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { navbarData } from './nav-data';
import { CommonModule } from '@angular/common';
import { UserStoreService } from '../../Services/user-store.service';
import { AuthService } from '../../Services/auth.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

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
    public resetPasswordEmail!:string;
    public isValidEmail!:boolean;
    public isRequired :boolean = true;

    mobileSideBar : boolean = false;
    mobilePanel : boolean = false;
    runOpenFun : boolean = false;
   
    value: any;
    id:string = "";
    public name : string = "User";

    constructor(
        private userStore : UserStoreService, 
        private auth : AuthService,
        private breakpointObserver: BreakpointObserver,
    ) { 
      this.breakpointObserver.observe([
        "(max-width: 481px)"
      ]).subscribe((result: BreakpointState) => {
        if (result.matches) {
            // hide stuff  
            this.mobileSideBar = true;   
        } else {
            // show stuff
        }
      });
    }

    ngOnInit(): void {
        this.userStore.getNameFromStore()
        .subscribe((val) => {
            // console.log(val);
            let nameFromToken = this.auth.getNameFromToken();
            // console.log(nameFromToken);
            this.name = val || nameFromToken;
            // console.log(this.name);
        })
    }

    closeSidenav() {
      this.collapsed = true;
    }
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    }

    mobileSideViewOpen(){
      this.mobileSideBar = false;
      this.mobilePanel = true;
      this.runOpenFun = true;
    }
  
    mobileSideViewClose(){
      this.mobileSideBar = true;
      this.mobilePanel = false;
      this.runOpenFun = false;
    }
  
    @HostListener("document:click", ["$event"])
    onClick(event: MouseEvent){
      if (!this.runOpenFun && this.mobilePanel) {
          this.mobileSideViewClose();      
      }
      else{
        this.runOpenFun = false;
      }
    }
}
