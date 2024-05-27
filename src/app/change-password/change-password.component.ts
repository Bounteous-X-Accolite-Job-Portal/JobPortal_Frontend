import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ForgetPasswordService } from '../Services/ForgetPassword/forget-password.service';
import { ChangePasswordService } from '../Services/ChangePassword/change-password.service';
import { resertPassword } from '../Models/resetPasswordmodel';
import { catchError, tap, throwError } from 'rxjs';
// import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule,CommonModule,ToastrModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  
  newPassword: string = '';
  confirmPassword: string = '';
  resetPasswordObj:resertPassword=new resertPassword();
  email: string | undefined;
  value: any;
  gotemail:boolean=false;
  public resetPasswordEmail!:string;
  public isValidEmail!:boolean;
  public isRequired :boolean = true;
  msgService = inject(ToastrModule)

  constructor(
    private resetPasswordService: ChangePasswordService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ){}
  

  checkValidEmail(event:string) {
    this.value = event;
    if(this.value){
      this.isRequired=false;
    }
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    this.isValidEmail = pattern.test(this.value);
    console.log(this.isValidEmail);
    return this.isValidEmail;
  }
    
      confirmToSend() {
        //this.gotemail=!this.gotemail;
        if (this.value) {
          console.log(this.value);
          this.resetPasswordService.sendChangePasswordLink(this.value).subscribe({
            
          
            next:(res:any)=>{
              //this.toastr.success("Hey Check Your Mail Buddy!!!");
              
              this.resetPasswordEmail=" ";
              const buttonRef=document.getElementById("closeBtn");
              //this.toastr.success("Hey Check Your Mail Buddy!!!");
              buttonRef?.click();
            },
  
            error:(err:any)=>{
              
            },
            
          });
          //this.gotemail=!this.gotemail;
        }}



    //changePasswordForm: FormGroup;
    
    
    
}
