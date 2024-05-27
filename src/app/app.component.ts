import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { AppModule } from './app.module';
import { SpinnerService } from './Services/spinner.service';
import { SpinnerComponent } from './Components/spinner/spinner.component';
import { UserStoreService } from './Services/user-store.service';
import { ResponseModal } from './Models/ResponseModal';
import { Toast, ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, AppModule, SpinnerComponent, ToastrModule],
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
    private toast : ToastrService,
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
    this.spinnerService.showSpinner();

    this.authService.logoutFromBackend().subscribe(
      (res : ResponseModal) => {
        this.authService.logout();

        this.toast.success(res.message);
        this.spinnerService.hideSpinner();

        this.router.navigate(["/login"]);
      },
      (error) => {
        console.log(error);
        this.toast.error("Error while logging out !, " + error.message);
        this.spinnerService.hideSpinner();
      }
    )
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
