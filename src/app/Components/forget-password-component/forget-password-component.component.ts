import { Component, Inject, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router' ;
import { ActivatedRoute } from '@angular/router';
import { ResetPassword } from '../../Models/ResetPassword';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { ChangePasswordService } from '../../Services/ChangePassword/change-password.service';
@Component({
  selector: 'app-forget-password-component',
  standalone: true,
  imports: [FormsModule, ToastrModule, RouterLink],
  templateUrl: './forget-password-component.component.html',
  styleUrl: './forget-password-component.component.css'
})
export class ForgetPasswordComponentComponent implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';
  resetPasswordObj:ResetPassword=new ResetPassword();
  email: string | undefined;

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
        this.resetPasswordObj.email = this.email;
      });
    }
    // resetPassword() {
    //   if (
    //     this.resetPasswordObj.newPassword !== this.resetPasswordObj.confirmPassword
    //   ) {
    //     this.toaster.error("New Password & Confirm Password didn't match!!")
    //     return;
    //   }
    //   console.log(this.resetPasswordObj)
    //   this.resetPasswordService
    //     .resertPassword(this.resetPasswordObj)
    //     .pipe(
    //       tap((response) => {
    //         // console.log('Reset password response:', response);
    //         this.toaster.success('Successfully Changed Password, Login with your new credentials!')
    //         this.router.navigate(['login']);
    //       }),
    //       catchError((error) => {
    //         this.toaster.error('Error : ', error);
    //         return throwError(() => error);
    //       })
    //     )
    //     .subscribe();
    // }

    resetPassword()
    {
      if(this.resetPasswordObj.newPassword !== this.resetPasswordObj.confirmPassword) 
        {
          this.toaster.error("New Password & Confirm Password didn't match!!")
          return;
        }

      this.resetPasswordService.resetPassword(this.resetPasswordObj).subscribe(
        (res)=>{
          // console.log(res);
          this.confirmPassword='';
          this.newPassword='';
          this.toaster.success("Password Reset Successfully!!");
          this.router.navigate(['/login']);
          
        },
        (error)=>{
          this.toaster.error("Error : ", error);
          // console.log(error);
        }
      )
    }
  }














