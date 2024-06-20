import { Component, OnInit } from '@angular/core';
import { Referral } from '../../../Models/ReferralResponse/referral';
import { ReferralServiceService } from '../../../Services/ReferralService/referral-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JobService } from '../../../Services/Job/job.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AddReferralResponse } from '../../../Models/ReferralResponse/add-referral-response';

@Component({
  selector: 'app-add-referral',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ToastrModule, CommonModule],
  templateUrl: './add-referral.component.html',
  styleUrl: './add-referral.component.css',
})
export class AddReferralComponent implements OnInit {
  referralForm!: FormGroup;
  referralObj: Referral = new Referral();
  jobId: string = '';

  constructor(
    private referralService: ReferralServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.referralForm= new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,  Validators.email]),
      jobId: new FormControl('')
    })
  }

  get f(){
    return this.referralForm.controls;
  }

  
  addreferal() {
    const id = String(this.route.snapshot.params['id']);
    this.referralForm.get('jobId')?.setValue(id);

    this.referralService.addreferral(this.referralForm.value).subscribe(
      (res: AddReferralResponse) => {
        // console.log(res);

        if (res.status == 200) {
          this.toastr.success(
            'Successfully Referred ' + this.referralForm.get('firstName')?.value
          );
          
          this.referralForm.reset();
          this.router.navigate(['../employee-dashboard/referral']);
        } else {
          this.toastr.error(res.message);
        }
      },
      (error: AddReferralResponse) => {
        this.toastr.error(error.message);
        console.error('Error while referring :', error.message);
      }
    );
  }
}