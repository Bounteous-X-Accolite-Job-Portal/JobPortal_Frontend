import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  profileForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
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
      // experience: this.fb.group({
      //   degreeId: [''],
      //   degree: ['',Validators.required],
      //   college: ['', Validators.required],
      //   university: [''],
      //   startDate: ['', Validators.required],
      //   endDate: [''],
      //   isDegreeOnGoing: [false],
      //   grade: ['']
      // }),
      createdAt: ['']
    });
  }

  onSubmit() {
   
    if (this.profileForm.valid) {
      // Process form data (e.g., send to backend)
      console.log(this.profileForm.value);
      //console.warn(this.profileForm.value);
    } else {
      // Handle form validation errors
      console.log('Form is invalid');
    }
  }


}
