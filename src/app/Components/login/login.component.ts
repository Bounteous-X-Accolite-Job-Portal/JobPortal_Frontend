import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import {parse, stringify, toJSON, fromJSON} from 'flatted';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.authService
      .login(
        this.loginForm.controls['email'],
        this.loginForm.controls['password']
      )
      .subscribe(
        (data) => {
          console.log(stringify(data));
          console.log('Login successful');
          //.message = 'Login successful!';
        },
        (error) => {
          console.log(error);
          //this.message = 'Invalid email or password.';
        }
      );
  }
}
