import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../../Models/loginUser';
import { LoginResponse } from '../../Models/loginResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent  {
  message: string = "";
  checkBoxValue: any = false;
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
    private router: Router
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: [''],
  });

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = {
        Email: this.loginForm.value.email,
        Password: this.loginForm.value.password,
        RememberMe: this.checkCheckBoxvalue(),
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
              console.log("vishal", data.token);
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
}
