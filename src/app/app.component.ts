import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { AppModule } from './app.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, AppModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Job-Portal';

  public isLoggedIn : boolean = false;
  
  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  ngOnInit(): void {
      this.isLoggedIn = this.authService.isLoggedIn();
      
      this.authService.AuthEvent.subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn;
      })
  }

  logout(){
    this.authService.logout();
  }


}
