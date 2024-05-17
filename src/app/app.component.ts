import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { AppModule } from './app.module';

import { SpinnerService } from './Services/spinner.service';
import { SpinnerComponent } from './Components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, AppModule, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Job-Portal';

  public isLoggedIn : boolean = false;
  loading = false;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinnerService: SpinnerService,
  ){
    this.spinnerService.spinner$.subscribe((data: boolean) => {
      setTimeout(() => {
        this.loading = data ? data : false;
      });
      console.log(this.loading);
    });
  }

  ngOnInit(): void {
      this.isLoggedIn = this.authService.isLoggedIn();
      
      this.authService.AuthEvent.subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn;
      })
  }

  logout(){
    console.log('show spinner');
    this.spinnerService.showSpinner();

    this.authService.logout();
    
    console.log('hide spinner');
    this.spinnerService.hideSpinner();

    this.router.navigate(["/login"]);
  }


}
