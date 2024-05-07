import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Job-Portal';

  public isLoggedIn : boolean = false;
  
  constructor(
    private authService: AuthService,
    private router: Router,
  ){
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
      
  }

  logout(){
    this.authService.logout();
  }


}
