import { Component, Inject, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router' ;
import { catchError, tap, throwError } from 'rxjs';
import { ForgetPasswordService } from '../forget-password.service';
import { ActivatedRoute } from '@angular/router';
import { resertPassword } from '../Models/resetPasswordmodel';
import { FormsModule } from '@angular/forms';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-forget-password-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forget-password-component.component.html',
  styleUrl: './forget-password-component.component.css'
})


export class ForgetPasswordComponentComponent implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';
  resetPasswordObj:resertPassword=new resertPassword();
  email: string | undefined;
  //msgService = inject(MessageService)

  constructor(
    private resetPasswordService: ForgetPasswordService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService:MessageService
  
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
        .resertPassword(this.resetPasswordObj)
       
        .pipe(
          
          tap((response) => {
            console.log('Reset password response:', response);
            this.messageService.add
            ({severity:'success', 
            summary:'Service Message', 
            detail:'Via MessageService'});

            
            this.router.navigate(['login']);
          }),
          catchError((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Invalid Reset Link',
            });
            
            return throwError(() => error);
          })
        )
        .subscribe();
    }
  }







