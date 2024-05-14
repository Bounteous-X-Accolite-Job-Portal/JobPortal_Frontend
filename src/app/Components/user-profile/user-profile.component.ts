import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { navbarData } from './nav-data';
import { CommonModule } from '@angular/common';
import { ChangePasswordService } from '../../change-password.service';
 

@Component({
    selector: 'app-user-profile',
    standalone: true,
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.css',
    imports: [RouterOutlet, RouterModule, CommonModule]
})
export class UserProfileComponent {

    collapsed = false;
    navData = navbarData;
    public resetPasswordEmail!:string;
    public isValidEmail!:boolean;
    public isRequired :boolean = true;

   
  value: any;

    closeSidenav() {
        this.collapsed=false;
    }
    toggleCollapse() {
        this.collapsed=!this.collapsed;
    }

  //Change Password Confirm your mail 

//   checkValidEmail(event:string) {
//     this.value = event;
//     if(this.value){
//       this.isRequired=false;
//     }
//     const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
//     this.isValidEmail = pattern.test(this.value);
//     console.log(this.isValidEmail);
//     return this.isValidEmail;
//   }
    
//       confirmToSend() {
//         if (this.value) {
//           console.log(this.value);
//           this.changePassword.sendChangePasswordLink(this.value).subscribe({
//             next:(res:any)=>{
              
//               this.resetPasswordEmail=" ";
//               const buttonRef=document.getElementById("closeBtn");
//               buttonRef?.click();
//             },
  
//             error:(err:any)=>{
              
//             },
//           });
//         }}


}
