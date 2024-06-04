import { Component, Inject, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router' ;
import { ActivatedRoute } from '@angular/router';
import { ResetPassword } from '../../Models/ResetPassword';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { ChangePasswordService } from '../../Services/ChangePassword/change-password.service';
@Component({
  selector: 'app-forget-password-component',
  standalone: true,
  imports: [FormsModule, ToastrModule, RouterLink, ReactiveFormsModule],
  templateUrl: './forget-password-component.component.html',
  styleUrl: './forget-password-component.component.css'
})
export class ForgetPasswordComponentComponent implements OnInit {
  // newPassword: string = '';
  // confirmPassword: string = '';
  // resetPasswordObj:ResetPassword=new ResetPassword();
  email: string | undefined;
  forgetPasswordForm!: FormGroup;

  constructor(
    private resetPasswordService: ChangePasswordService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService
  ){}
    ngOnInit()
    {
      this.route.queryParams.subscribe((params) => {
        this.email = params['email'];
      });

      this.forgetPasswordForm = new FormGroup(
        {
          newPassword: new FormControl('', Validators.required),
          confirmPassword: new FormControl('', Validators.required)
        }
    )}

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

    resetPassword()
    {
      if(this.forgetPasswordForm.controls['newPassword'] !== this.forgetPasswordForm.controls['confirmPassword']) 
        {
          this.toaster.error("New Password & Confirm Password didn't match!!")
          return;
        }

      this.resetPasswordService.resetPassword(this.forgetPasswordForm.value).subscribe(
        (res)=>{
          this.toaster.success("Password Reset Successfully!!");
          this.forgetPasswordForm.reset();
          this.router.navigate(['/login']);
          
        },
        (error)=>{
          this.toaster.error("Error : ", error);
          // console.log(error);
        }
      )
    }
  }














