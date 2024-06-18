import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../Services/spinner.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    ToastrModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [AuthService, Router],
})
export class RegisterComponent {
  message: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toast : ToastrService,
    private spinnerService : SpinnerService
  ) {}

  registerForm = this.fb.group(
    {
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+(?: [A-Za-z]+)*$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+(?: [A-Za-z]+)*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$'),]],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: this.passwordMatchValidator,
    }
  );

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

  onSubmitRegister(): void {
    this.spinnerService.showSpinner();

    if (this.registerForm.valid) {
      const registerData = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };

      this.authService.registerUser(registerData).subscribe(
        (res) => {
          // console.log(res.message);
          if (res.status == 200) {
            this.toast.success(res.message);
            this.router.navigate(['/login']);
          } else {
            this.message = res.message;
            this.toast.error(res.message);
          }
          this.spinnerService.hideSpinner();
        },
        (error) => {
          console.error('Registration error:', error);
          this.toast.error("Error while registartion, please try again.");
          this.spinnerService.hideSpinner();
        }
      );
    } else {
      // console.log("Invalid Form");
      this.toast.error("Invalid Form !");
      this.spinnerService.hideSpinner();
    }
  }
}
