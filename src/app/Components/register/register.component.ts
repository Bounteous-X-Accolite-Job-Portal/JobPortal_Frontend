import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisClass } from '../../Models/registerUser';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {
  //public RegObj: RegisClass = new RegisClass();
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  // onSignup() {
  //   this.authService.register(registerUser).subscribe((res) => {
  //     //console.log(this.res);
  //   })
  // }

  //   onSubmitRegister(): void {
  //     const formData = this.registerForm.value;
  // const registerData: string[] = [
  //   formData.firstName || '',
  //   formData.lastName || '',
  //   formData.email || '',
  //   formData.password || ''
  //   // Add more fields if needed
  // ];
  //     this.authService.register(registerData): Observable<any> {
  //       // Handle response here
  //       console.log(res);
  //     }
  //   }

  ngOnInit(): void {}

  onSubmitRegister(): void {
    if (this.registerForm.valid) {
      const registerData = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };

      // this.authService
      //   .registerUser(registerData)
      //   .then((response) => {
      //     console.log('Registration successful:', response.data);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      this.authService.registerUser(registerData).subscribe(
        (res) => {
          // Handle successful registration
          console.log('Registration successful:', res);
        },
        (error) => {
          // Handle registration error
          console.error('Registration error:', error);
        }
      );
    } else {
      // Form is invalid, handle accordingly
    }
  }
}
