import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [AuthService, Router],
})
export class RegisterComponent implements OnInit {
  //public RegObj: RegisClass = new RegisClass();
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  registerForm = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: this.passwordMatchValidator,
    }
  );

  get passwordForm(): FormGroup {
    return this.registerForm;
  }

  // Setter for passwordForm
  set passwordForm(formGroup: FormGroup) {
    this.registerForm = formGroup;
  }

  // Custom validator function
  passwordMatchValidator(formGroup: FormGroup): any {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;

      if (password !== confirmPassword && confirmPassword !== '') {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    } else {
      return null;
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {}

  onSubmitRegister(): void {
    if (this.registerForm.valid) {
      const registerData = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };

      this.authService.registerUser(registerData).subscribe(
        (res) => {
          console.log('Registration successful:', res);

          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration error:', error);
        }
      );
    } else {
      // Form is invalid, handle accordingly
    }
  }
}
