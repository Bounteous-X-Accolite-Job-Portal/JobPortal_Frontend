import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { LoginResponse } from '../../Models/loginResponse';
import { UserStoreService } from '../../Services/user-store.service';
import { SpinnerService } from '../../Services/spinner.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ChangePasswordService } from '../../Services/ChangePassword/change-password.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ToastrModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  message: string = '';
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;
  public isRequired: boolean = true;
  value: any;
  checkBoxValue: any = false;
  toast: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userStore: UserStoreService,
    private spinnerService: SpinnerService,
    private forgetService: ChangePasswordService,
    private toaster: ToastrService
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=~!?_-]).*$'
        ),
      ],
    ],
    rememberMe: [true],
  });

  emailForm: any = this.fb.group({
    resetEmail: [' ', [Validators.required, Validators.email]],
  });

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    // console.log('show spinner');
    this.spinnerService.showSpinner();

    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe(
        (data: LoginResponse) => {
          // console.log(data);
          // console.log('Status', data.status, 'data message', data.message);

          if (data.status == 200) {
            // console.log(data.token);
            this.authService.storeToken(data.token ? data.token : '');

            // setting up user store
            const tokenPayload: any = this.authService.decodedToken();
            // console.log('Token payload in login line 67 ', tokenPayload);

            this.userStore.setEmailForStore(tokenPayload['Email']);
            this.userStore.setNameForStore(tokenPayload['Name']);
            this.userStore.setIsEmployeeForStore(tokenPayload['IsEmployee']);
            this.userStore.setRoleForStore(tokenPayload['Role']);
            this.userStore.setIdForStore(tokenPayload['Id']);
            this.userStore.setHasPrivilegeForStore(
              tokenPayload['HasPrivilege']
            );
            this.userStore.setHasSpecialPrivilegeForStore(
              tokenPayload['HasSpecialPrivilege']
            );

            // console.log('CheckIsEmployee', tokenPayload['IsEmployee']);

            if (
              !tokenPayload['IsEmployee']
            ) {
              this.router.navigate(['/jobs']);
              this.authService.AuthEvent.emit(true);
            } else {
              this.router.navigate(['/employee-dashboard']);
              this.authService.AuthEvent.emit(true);
            }
          } else {
            this.message = data.message;
          }

          // console.log('hide spinner');
          this.spinnerService.hideSpinner();
        },
        (error: any) => {
          // console.log('hide spinner');
          this.spinnerService.hideSpinner();
          this.toast.error('Could not login');
          // console.log(error);
        }
      );
    }
  }

  // checkValidEmail(event: string) {
  //   this.value = event;
  //   if (this.value) {
  //     this.isRequired = false;
  //   }
  //   const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
  //   this.isValidEmail = pattern.test(this.value);
  //   // console.log(this.isValidEmail);
  //   return this.isValidEmail;
  // }

  confirmToSend() {
    this.spinnerService.showSpinner();
    // console.log(this.emailForm.get('resetEmail').value);
    this.forgetService
      .sendForgetPasswordLink(this.emailForm.get('resetEmail').value)
      .subscribe({
        next: (res: any) => {
          // console.log(res);
          this.emailForm.reset();
          document.getElementById('closeBtn')?.click();
          this.spinnerService.hideSpinner();
          this.toaster.info('Check your mail to reset password!!');
        },
        error: (err: any) => {
          this.spinnerService.hideSpinner();
          this.emailForm.reset();
          document.getElementById('closeBtn')?.click();
          this.toaster.error('Sorry! This email is not registered with us!');
          // }
        },
      });
    // }
  }
}
