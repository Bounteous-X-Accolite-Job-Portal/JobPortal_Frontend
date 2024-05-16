import { Component } from '@angular/core';
import { ReferralServiceService } from '../referral-service.service';
import { Referral } from '../referral';

@Component({
  selector: 'app-referral',
  standalone: true,
  imports: [],
  templateUrl: './referral.component.html',
  styleUrl: './referral.component.css'
})
export class ReferralComponent {
  userData: Referral = {
    firstName: '',
    lastName: '',
    email: '',
    jobId: ''
  }; 

  constructor(private userService: ReferralServiceService) { }

  submitForm() {
    
    this.userService.referral(this.userData)
      .subscribe(
        (response) => {
          console.log('API Response:', response);
          
        },
        (error) => {
          console.error('API Error:', error);
          
        }
      );
  }
}



