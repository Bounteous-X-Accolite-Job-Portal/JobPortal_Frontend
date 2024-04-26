import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisClass } from '../../Models/registerUser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
    public RegObj: RegisClass = new RegisClass;
    constructor(){
      
    }
    onSignup(){
      
    }

    ngOnInit():void{

    }
}
