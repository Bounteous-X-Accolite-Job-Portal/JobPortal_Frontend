import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from './Services/auth.service';
import { AppModule } from './app.module';
import { SpinnerService } from './Services/spinner.service';
import { SpinnerComponent } from './Components/spinner/spinner.component';
import { UserStoreService } from './Services/user-store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, AppModule, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})


export class AppComponent {
  title = 'Job-Portal';

  public isLoggedIn : boolean = false;
  public isEmployee : boolean = false;
  loading = false;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinnerService: SpinnerService,
    private store : UserStoreService,
  ){
    this.spinnerService.spinner$.subscribe((data: boolean) => {
      setTimeout(() => {
        this.loading = data ? data : false;
      });
      // console.log(this.loading);
    });
  }

  ngOnInit(): void {
      this.isLoggedIn = this.authService.isLoggedIn();
      
      this.authService.AuthEvent.subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn;
      })

    // this.store.checkIsEmployeeFromStore().subscribe(val => {
    //     let employee = this.authService.checkIsEmployeeFromToken();
    //     this.isEmployee = employee || val;
    // })
    this.checkEmployee();
  }

  logout(){
    console.log('show spinner');
    this.spinnerService.showSpinner();

    this.authService.logout();

    console.log('hide spinner');
    this.spinnerService.hideSpinner();

    this.router.navigate(["/login"]);
  }

  checkEmployee(){
    this.spinnerService.showSpinner();
    // checking isEmployee
    this.store.checkIsEmployeeFromStore().subscribe(val => {
        let employee = this.authService.checkIsEmployeeFromToken();
        this.isEmployee = employee || val;
    })

    console.log("isEmployee at profile tab", this.isEmployee);
    this.spinnerService.hideSpinner();
  }
}
