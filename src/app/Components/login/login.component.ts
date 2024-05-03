import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/CandidateAuthentication/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
//   @Input() ngModel: any;
//   @Output() isAcceptedChange = new EventEmitter();
  // isAccepted = true;

  message: string = '';

  checkBoxValue: boolean = false;
  checkCheckBoxvalue(): boolean {
    this.checkBoxValue = !this.checkBoxValue;
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
          console.log('Status', data.status, 'data message', data.message);
          if (data.status == 200) {
            this.router.navigate(['/user-profile']);
          } else {
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
