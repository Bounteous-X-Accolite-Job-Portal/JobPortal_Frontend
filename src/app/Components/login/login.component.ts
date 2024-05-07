import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/CandidateAuthentication/auth.service';
import { Router, RouterModule } from '@angular/router';
// import { Login } from '../../Models/loginUser';
import { LoginResponse } from '../../Models/loginResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  message: string = '';

  SignInForm = new FormGroup({
    email : new FormControl(''),
    password : new FormControl(''),
    rememberMe : new FormControl(false)
  })

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
        Email: this.f['email'].value,
        Password: this.loginForm.value.password,
        RememberMe: this.loginForm.controls['rememberMe'].value,
      };
      console.log(this.SignInForm);
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
