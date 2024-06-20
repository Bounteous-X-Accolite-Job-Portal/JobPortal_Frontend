import { Component, Inject, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router' ;
import { ActivatedRoute } from '@angular/router';
import { ResetPassword } from '../../Models/ResetPassword';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { ChangePasswordService } from '../../Services/ChangePassword/change-password.service';
import { CommonModule, NgIf } from '@angular/common';
import { SpinnerService } from '../../Services/spinner.service';
@Component({
  selector: 'app-forget-password-component',
  standalone: true,
  imports: [FormsModule, ToastrModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './forget-password-component.component.html',
  styleUrl: './forget-password-component.component.css'
})
export class ForgetPasswordComponentComponent implements OnInit {
  // newPassword: string = '';
  // confirmPassword: string = '';
  // resetPasswordObj:ResetPassword=new ResetPassword();
  email: string | undefined;
  // forgetPasswordForm!: FormGroup;

  constructor(
    private resetPasswordService: ChangePasswordService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private fb: FormBuilder,
    private spinnerService: SpinnerService
  ){}

  ngOnInit()
  {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.forgetPasswordForm.get('email')?.setValue(params['email']);
    });

    }

  forgetPasswordForm = this.fb.group({
    email: [''],
    newPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=~!?_-]).*$'
        ),
      ],
    ],
      confirmPassword: [ '',  Validators.required]
    },
    {
      validators: this.passwordMatchValidator
    }
)

    passwordMatchValidator(formGroup: FormGroup): any {
      const passwordControl = formGroup.get('newPassword');
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
    
    get f(){
      return this.forgetPasswordForm.controls;
    }

    resetPassword()
    {
      this.spinnerService.showSpinner();     
      this.resetPasswordService.resetPassword(this.forgetPasswordForm.value).subscribe(
        (res)=>{
          this.spinnerService.hideSpinner();
          if(res.status === 200 ){
            this.toaster.success("Password Reset Successfully!!");
            this.forgetPasswordForm.reset();
            this.router.navigate(['/login']);
          }else{
            this.toaster.error(res.message);
          }
          
        },
        (error)=>{
          this.spinnerService.hideSpinner();
          this.toaster.error("Error : ", error.message);
          // console.log(error);
        }
      )
    }
  }














