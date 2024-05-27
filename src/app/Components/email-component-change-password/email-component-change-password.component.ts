import { Component } from '@angular/core';
import { ResetPassword } from '../../Models/ResetPassword';
import { ChangePasswordService } from '../../Services/ChangePassword/change-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  
} from '@angular/forms';
import { catchError, tap, throwError } from 'rxjs';
import { UserStoreService } from '../../Services/user-store.service';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-component-change-password',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './email-component-change-password.component.html',
  styleUrl: './email-component-change-password.component.css',
})
export class EmailComponentChangePasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  resetPasswordObj: ResetPassword=  new ResetPassword();
  email: string = '';
  value: any;
  gotemail: boolean = false;
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;
  public isRequired: boolean = true;
  public pwdForm!: FormGroup;

  changePasswordForm!: FormGroup;

  constructor(
    private changePasswordService: ChangePasswordService,
    private route: ActivatedRoute,
    private router: Router,
    private userStoreService: UserStoreService,
    private authService: AuthService,
    private fb : FormBuilder
  ) {}
  ngOnInit()
  {
    this.pwdForm = this.fb.group({
      currentPassword:[''],
      newPassword:[''],
      confirmPassword:['']
    },
    {
      validators: this.passwordMatchValidator,
    });
  }
  get f() {
    return this.pwdForm.controls;
  }

  // resetPassword() {
  //   this.userStoreService.getEmailFromStore().subscribe((val) => {
  //     this.resetPasswordObj.email = val || this.authService.getEmailFromToken();
  //   });
  //   if (
  //     this.resetPasswordObj.newPassword !=
  //     this.resetPasswordObj.confirmPassword
  //   ) {
  //     return;
  //   }
  //   console.log(this.resetPasswordObj);

  //   this.resetPasswordService
  //     .changePassword(this.resetPasswordObj)

  //     .pipe(
  //       tap((response) => {
  //         console.log('Reset password response:', response);
  //         this.router.navigate(['login']);
  //       }),
  //       catchError((error) => {
  //         return throwError(() => error);
  //       })
  //     )
  //     .subscribe();
  // }

  resetPassword(){
    console.log(this.pwdForm.value);
    this.changePasswordService.changePassword(this.pwdForm.value).subscribe(
      (res)=>{
        console.log(res);
      },
      (error)=>
        {
          console.log(error);
      }
    )
  }


  passwordMatchValidator(formGroup: FormGroup): any {
    const passwordControl = formGroup.get('newPassowrd');
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

}
