import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
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
        (data: any) => {
          console.log('Login successful', data);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}
