import { Component, TemplateRef, inject } from '@angular/core';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { AuthService } from '../../../Services/auth.service';
import { UserStoreService } from '../../../Services/user-store.service';
import { SocialMedia } from '../../../Models/SocialMediaResponse/SocialMedia';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../../Services/spinner.service';

@Component({
  selector: 'app-social-profiles',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastrModule],
  templateUrl: './social-profiles.component.html',
  styleUrl: './social-profiles.component.css',
})
export class SocialProfilesComponent {
  constructor(
    private candidService: CandidateService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private spinner: SpinnerService
  ) {}

  mediaForm!: FormGroup;
  socialMedia!: SocialMedia;

  userId: string = '';
  addSocialMedia: boolean = false;
  updateSocialMedia: boolean = false;
  isAccessible: boolean = false;
  enableAddButton: boolean = false;
  enableEditButton: boolean = false;
  enableBack: boolean = false;

  link1: boolean = true;
  link2: boolean = true;
  link3: boolean = true;

  ngOnInit(): void {
    this.mediaForm = this.fb.group({
      link1: [''],
      link2: [''],
      link3: [''],
    });
    this.userStore.getIdFromStore().subscribe((val) => {
      // console.log(val);
      let idFromToken = this.auth.getIdFromToken();
      // console.log(idFromToken);
      this.userId = val || idFromToken;
      // console.log('Logged User Id : ', this.userId);
    });

    this.loadSocialMediaDetails();
    this.addSocialMedia = false;
    this.updateSocialMedia = false;
    this.enableAddButton = false;
    this.enableEditButton = false;
  }

  private loadSocialMediaDetails() {
    this.spinner.showSpinner();
    this.candidService.getSocialMediaDetails(this.userId).subscribe(
      (res) => {
        // console.log(res);
        // this.toastr.success("Social links fetched");
        this.socialMedia = res.socialMedia;
        this.checkSocialMedia();

        this.mediaForm.get('link1')?.setValue(this.socialMedia.link1 || '');
        this.mediaForm.get('link2')?.setValue(this.socialMedia.link2 || '');
        this.mediaForm.get('link3')?.setValue(this.socialMedia.link3 || '');

        this.disablefields();
        this.enableLinks();
        this.spinner.hideSpinner();
      },
      (error) => {
        this.toastr.error('Error in fetching links');
        console.log(error);
        this.spinner.hideSpinner();
      }
    );
  }

  private checkSocialMedia() {
    if (this.socialMedia == null) {
      this.socialMedia = { link1: '', link2: '', link3: '' };
      this.enableAddButton = true;
      this.enableEditButton = false;
    } else {
      this.enableEditButton = true;
      this.enableAddButton = false;
    }
  }

  public funaddSocialMedia(): void {
    // console.log(this.mediaForm.value);
    this.candidService.addSocialMedia(this.mediaForm.value).subscribe(
      (res) => {
        // console.log(res);
        this.socialMedia.socialMediaId = res.socialMediaId;
        this.socialMedia.link1 = this.mediaForm.value.link1;
        this.socialMedia.link2 = this.mediaForm.value.link2;
        this.socialMedia.link3 = this.mediaForm.value.link3;
        this.ngOnInit();
        this.toastr.success('Social Media Profiles Added!!');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public funupdateSocialMedia(): void {
    this.socialMedia.link1 = this.mediaForm.value.link1;
    this.socialMedia.link2 = this.mediaForm.value.link2;
    this.socialMedia.link3 = this.mediaForm.value.link3;

    this.candidService.updateSocialMedia(this.socialMedia).subscribe(
      (res) => {
        // console.log(res);
        this.ngOnInit();
        this.toastr.success('Social Media Profiles Updated!!');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public activeAddSocialMedia(): void {
    this.addSocialMedia = true;
    this.updateSocialMedia = false;
    this.enablefields();
  }

  public activeEditSocialMedia(): void {
    this.addSocialMedia = false;
    this.updateSocialMedia = true;
    this.enablefields();
  }

  public disablefields(): void {
    this.isAccessible = false;
    this.mediaForm.controls['link1'].disable();
    this.mediaForm.controls['link2'].disable();
    this.mediaForm.controls['link3'].disable();
    this.enableBack = false;
  }

  public enablefields(): void {
    this.isAccessible = true;
    this.mediaForm.controls['link1'].enable();
    this.mediaForm.controls['link2'].enable();
    this.mediaForm.controls['link3'].enable();
    this.enableBack = true;
  }

  public enableLinks(): void {
    if (this.socialMedia.link1 != null && this.socialMedia.link1.length > 0) {
      this.link1 = true;
    }
    else
      this.link1 = false;

    if (this.socialMedia.link2 != null && this.socialMedia.link2.length > 0) {
      this.link2 = true;
    }
    else
      this.link2 = false;
    
    if (this.socialMedia.link3 != null && this.socialMedia.link3.length > 0) {
      this.link3 = true;
    }
    else
      this.link3 = false;
  }
}
