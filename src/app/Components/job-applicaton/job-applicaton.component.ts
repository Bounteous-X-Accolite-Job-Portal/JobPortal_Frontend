import { Component } from '@angular/core';
import { UserStoreService } from '../../Services/user-store.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-job-applicaton',
  standalone: true,
  imports: [],
  templateUrl: './job-applicaton.component.html',
  styleUrl: './job-applicaton.component.css'
})
export class JobApplicatonComponent {
    UserId : Observable<string> | undefined;
    
    constructor(private userStore : UserStoreService){}

    ngOnInit(): void {
      this.UserId =  this.userStore.getIdFromStore(); 
      console.log("Logged In User : ",this.UserId);
    }
  }
