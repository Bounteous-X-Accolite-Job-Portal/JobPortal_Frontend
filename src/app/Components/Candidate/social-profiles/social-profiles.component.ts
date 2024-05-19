import { Component, TemplateRef, inject } from '@angular/core';
import { CandidateService } from '../../../Services/CandidateService/candidate.service';
import { AuthService } from '../../../Services/auth.service';
import { UserStoreService } from '../../../Services/user-store.service';
import { SocialMedia } from '../../../Models/SocialMediaResponse/SocialMedia';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

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
    private toastr:ToastrService
  ) {}

  mediaForm!: FormGroup;
  socialMedia!: SocialMedia;

  userId: string = '';
  addSocialMedia: boolean = false;
  updateSocialMedia: boolean = false;
  isAccessible: boolean = false;
  enableAddButton: boolean = false;
  enableEditButton: boolean = false;

  ngOnInit(): void 
  {
    this.userStore.getIdFromStore().subscribe((val) => {
      console.log(val);
      let idFromToken = this.auth.getIdFromToken();
      console.log(idFromToken);
      this.userId = val || idFromToken;
      console.log('Logged User Id : ', this.userId);
    });

    this.loadSocialMediaDetails();
    this.addSocialMedia = false;
    this.updateSocialMedia = false;
    this.isAccessible = false;
    this.enableAddButton = false;
    this.enableEditButton = false;
  }

  private loadSocialMediaDetails() {
    this.candidService.getSocialMediaDetails(this.userId).subscribe(
      (res) => {
        console.log(res);
        this.socialMedia = res.socialMedia;
        this.checkSocialMedia();

        console.log('result : ', this.socialMedia);
        console.log('l1 : ', this.socialMedia.link1);
        console.log('l2 : ', this.socialMedia.link2);
        console.log('l3 : ', this.socialMedia.link3);
        console.log('id : ', this.socialMedia.socialMediaId);

        this.mediaForm = new FormGroup({
          link1: new FormControl('' || this.socialMedia.link1),
          link2: new FormControl('' || this.socialMedia.link2),
          link3: new FormControl('' || this.socialMedia.link3),
        });

        this.disablefields();
      },
      (error) => {
        console.log(error);
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
    console.log(this.mediaForm.value);
    this.candidService.addSocialMedia(this.mediaForm.value).subscribe(
      (res) => {
        console.log(res);
        this.socialMedia.socialMediaId = res.socialMediaId;
        this.socialMedia.link1 = this.mediaForm.value.link1;
        this.socialMedia.link2 = this.mediaForm.value.link2;
        this.socialMedia.link3 = this.mediaForm.value.link3;
        this.ngOnInit();
        this.toastr.success("Socail Media Profiles Added!!");
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
        console.log(res);
        this.ngOnInit();
        this.toastr.success("Socail Media Profiles Updated!!");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public activeAddSocialMedia(): void {
    this.addSocialMedia = true;
    this.updateSocialMedia = false;
    this.isAccessible = true;
    this.enablefields();
  }

  public activeEditSocialMedia(): void {
    this.addSocialMedia = false;
    this.updateSocialMedia = true;
    this.isAccessible = true;
    this.enablefields();
  }

  public disablefields(): void {
    this.mediaForm.controls['link1'].disable();
    this.mediaForm.controls['link2'].disable();
    this.mediaForm.controls['link3'].disable();
  }

  public enablefields(): void {
    this.mediaForm.controls['link1'].enable();
    this.mediaForm.controls['link2'].enable();
    this.mediaForm.controls['link3'].enable();
  }
}
