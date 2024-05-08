import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { LoginResponse } from '../../Models/loginResponse';
import { UserStoreService } from '../../Services/user-store.service';

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
    private router: Router,
    private userStore : UserStoreService
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

              // setting up user store
              const tokenPayload : any = this.authService.decodedToken();
              console.log("Token payload in login line 67 ", tokenPayload);

              this.userStore.setEmailForStore(tokenPayload["Email"]);
              this.userStore.setNameForStore(tokenPayload["Name"]);
              this.userStore.setIsEmployeeForStore(tokenPayload["IsEmployee"]);
              this.userStore.setRoleForStore(tokenPayload["Role"]);
              this.userStore.setIdForStore(tokenPayload["Id"]);

              this.authService.AuthEvent.emit(true);

              console.log("CheckIsEmployee", tokenPayload["IsEmployee"]);
              if(!tokenPayload["IsEmployee"]) {
                this.router.navigate(['/profile']);
              }
              else{
                this.router.navigate(['/employee-dashboard']);
              }
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
