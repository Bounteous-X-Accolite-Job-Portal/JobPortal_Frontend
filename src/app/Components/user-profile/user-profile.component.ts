import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  profileForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.profileForm = this.fb.group({
      userId: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNo: [''],
      isEmailVerified: [false],
      address: this.fb.group({
        houseNo: [''],
        locality: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      education: this.fb.group({
        degreeId: [''],
        degree: ['',Validators.required],
        college: ['', Validators.required],
        university: [''],
        startDate: ['', Validators.required],
        endDate: [''],
        isDegreeOnGoing: [false],
        grade: ['']
      }),
      experience: this.fb.group({
        degreeId: [''],
        degree: ['',Validators.required],
        college: ['', Validators.required],
        university: [''],
        startDate: ['', Validators.required],
        endDate: [''],
        isDegreeOnGoing: [false],
        grade: ['']
      }),
      createdAt: ['']
    });
  }

  onSubmit() {
    console.warn(this.profileForm.value);
  }
}
