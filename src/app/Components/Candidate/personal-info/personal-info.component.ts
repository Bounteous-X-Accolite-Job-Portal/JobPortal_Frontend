import { Component } from '@angular/core';
import { Candidate } from '../../../Models/Backend/Candidate';
import { UserStoreService } from '../../../Services/user-store.service';
import { AuthService } from '../../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { SpinnerService } from '../../../Services/spinner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent {
  candidate!: Candidate;
  isAccessible: boolean = false;

  userId: string = "";
  userName: string = "";
  
  profileForm!:FormGroup;

  constructor(
    private userStore : UserStoreService,
    private auth : AuthService,
    private toastr : ToastrService,
    private fb: FormBuilder,
    private cs: CandidateService,
    private spinnerService: SpinnerService,
  ) {}


  ngOnInit() : void{
    this.loadCandidateId();
    this.loadCandidateInfo();

    this.profileForm = this.fb.group({
      phone: [''],
      addressLine1:[''],
      city:[''],
      state:[''],
      country:[''],
      zipCode:['']
    });

    this.disableFields();
  }

  loadCandidateId(){
    this.spinnerService.showSpinner();

    this.userStore.getIdFromStore()
    .subscribe((val) => {
      // console.log(val);
      let idFromToken = this.auth.getIdFromToken();
      // console.log(idFromToken);
      this.userId = val || idFromToken;
      // console.log("Logged User Id : ",this.userId);
      this.spinnerService.hideSpinner();
    })

  }

  loadCandidateInfo(){
    this.spinnerService.showSpinner();

      this.cs.getCandidateById(this.userId).subscribe(
        (res) => {
          // console.log(res);
          this.candidate=res.candidate;
          this.toastr.success("Candidate data retrieved");
          // console.log(this.candidate);

          this.profileForm.get('phone')?.setValue(this.candidate.phone || 'NA');
          this.profileForm.get('addressLine1')?.setValue(this.candidate.addressLine1 || 'NA');
          this.profileForm.get('city')?.setValue(this.candidate.city || 'NA');
          this.profileForm.get('state')?.setValue(this.candidate.state || 'NA');
          this.profileForm.get('country')?.setValue(this.candidate.country || 'NA');
          this.profileForm.get('zipCode')?.setValue(this.candidate.zipCode || 'NA');
                
          this.spinnerService.hideSpinner();
        },
        (error) => {
          console.log(error);
          this.toastr.error("Error in retrieving data");
          this.spinnerService.hideSpinner();
        }
      )
  } 

  public disableFields(): void{
    this.isAccessible = false;
    this.profileForm.controls['phone'].disable();
    this.profileForm.controls['addressLine1'].disable();
    this.profileForm.controls['city'].disable();
    this.profileForm.controls['state'].disable();
    this.profileForm.controls['country'].disable();
    this.profileForm.controls['zipCode'].disable();
  }
  
  public enableFields(): void{
    this.isAccessible = true;
    this.profileForm.controls['phone'].enable();
    this.profileForm.controls['addressLine1'].enable();
    this.profileForm.controls['city'].enable();
    this.profileForm.controls['state'].enable();
    this.profileForm.controls['country'].enable();
    this.profileForm.controls['zipCode'].enable();
  }

  public funUpdateProfile() : void
  {
    this.candidate.phone = this.profileForm.value.phone;
    this.candidate.addressLine1 = this.profileForm.value.addressLine1;
    this.candidate.city = this.profileForm.value.city;
    this.candidate.state = this.profileForm.value.state;
    this.candidate.country = this.profileForm.value.country;
    this.candidate.zipCode = this.profileForm.value.zipCode;

    this.cs.updateCandidateProfile(this.candidate).subscribe(
      (res)=>{
        this.toastr.success("Profile updated successfully");
        this.ngOnInit();
      },
      (error)=>{
        this.toastr.error("Error updating profile");
        // console.log(error);
      }
    );
  }
}
