import { Component } from '@angular/core';
import { resertPassword } from '../../Models/resetPasswordmodel';
import { ChangePasswordService } from '../../Services/ChangePassword/change-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-email-component-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './email-component-change-password.component.html',
  styleUrl: './email-component-change-password.component.css'
})
export class EmailComponentChangePasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  resetPasswordObj:resertPassword=new resertPassword();
  email: string | undefined;
  value: any;
  gotemail:boolean=false;
  public resetPasswordEmail!:string;
  public isValidEmail!:boolean;
  public isRequired :boolean = true;
  //msgService = inject(MessageService)

  constructor(
    private resetPasswordService: ChangePasswordService,
    private route: ActivatedRoute,
    private router: Router,
  //  private messageService:MessageService
  
  ){}
  ngOnInit()
  {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.resetPasswordObj.Email = this.email;
    });

  }
  resetPassword() {
    if (
      this.resetPasswordObj.NewPassword !==
      this.resetPasswordObj.ConfirmPassword
    ) {
      
      return;
    }
    console.log(this.resetPasswordObj)
   
    this.resetPasswordService
      .  changePassword
      (this.resetPasswordObj)
     
      .pipe(
        
        tap((response) => {
          console.log('Reset password response:', response);
          // this.messageService.add
          // ({severity:'success', 
          // summary:'Service Message', 
          // detail:'Via MessageService'});

          
          this.router.navigate(['login']);
        }),
        catchError((error) => {
          // this.messageService.add({
          //   severity: 'error',
          //   summary: 'Error',
          //   detail: 'Invalid Reset Link',
          // });
          
          return throwError(() => error);
        })
      )
      .subscribe();
  }

}
