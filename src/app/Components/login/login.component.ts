import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { LoginResponse } from '../../Models/loginResponse';
import { ForgetPasswordService } from '../../forget-password.service';
import { error } from 'console';
import { resertPassword } from '../../Models/resetPasswordmodel';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule ,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent  {
  message: string = "";
  public resetPasswordEmail!:string;
  public isValidEmail!:boolean;
  public isRequired :boolean = true;
  value: any;
  checkBoxValue: any = false;
  toast: any;
  checkCheckBoxvalue(): boolean {
    if (this.checkBoxValue == true) {
      this.checkBoxValue = false;
    } else {
      this.checkBoxValue = true;
    }
    return this.checkBoxValue;
  }
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private forgetService:ForgetPasswordService,
    
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: [true],
  });






  get f() {
    return this.loginForm.controls;
  }

  
  
  
  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = {
        Email: this.f['email'].value,
        Password: this.loginForm.value.password,
        RememberMe: this.loginForm.controls['rememberMe'].value,
      };

      
    
     console.log(loginData);

      this.authService.loginUser(loginData).subscribe(
        (data: LoginResponse) => {
          console.log(data);
          console.log('Status', data.status, "data message", data.message);
          if(data.status == 200){
                console.log(data.token);
              this.authService.storeToken(data.token ? data.token : "");
              console.log(this.authService.getToken());
              console.log("shagun", data.token);
              this.router.navigate(['/user-profile']);
          }
          else{
            this.message = data.message;
          }
        },
        (error: any) => {
          console.log(error);
        }
      );

    }
    
    }
    
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
      if (this.checkValidEmail(this.value)) {
        console.log(this.value);
        this.forgetService.sendForgetPasswordLink(this.value).subscribe({
          next:(res:any)=>{
            
            this.resetPasswordEmail=" ";
            const buttonRef=document.getElementById("closeBtn");
            buttonRef?.click();
          },

          error:(err:any)=>{
            
          },
        });
      }}
         

    }
  

      

      
            




      
    
    