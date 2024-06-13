import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Resume } from '../../../Models/ResumeResponse/Resume';
import { UserStoreService } from '../../../Services/user-store.service';
import { AuthService } from '../../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ResumeServiceService } from '../../../Services/ResumeService/resume-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SpinnerService } from '../../../Services/spinner.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
})
export class ResumeComponent {
  userId: string = '';
  resumeExists: boolean = false;
  msg: string = '';
  userResume!: Resume;
  showRes: boolean = false;

  resumeUrl: string = '';
  urlSafe: SafeResourceUrl = '';
  file: File | null = null;
  uploading = false;
  uploadComplete = false;
  cldResponse: any;
  temp: string = '';
  fileSelected: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(
    private resumeService: ResumeServiceService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private spinner: SpinnerService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.userStore.getIdFromStore().subscribe((val) => {
      // console.log(val);
      let idFromToken = this.auth.getIdFromToken();
      // console.log(idFromToken);
      this.userId = val || idFromToken;
      // console.log("Logged User Id : ",this.userId);
    });

    this.getFunction();
  }

  resToggle() {
    this.showRes = !this.showRes;
  }

  getFunction() {
    this.spinner.showSpinner();
    this.resumeService.getResumeByCandidateId(this.userId).subscribe(
      (res) => {
        console.log(res);
        this.msg = res.message;
        if (res.resume == null) {
          this.toastr.info('No resume present');
          this.resumeExists = false;
          this.userResume = { resumeUrl: '', resumeId: '', candidateId: '' };
        } else {
          // this.toastr.success("Resume successfully retrieved");
          this.resumeExists = true;
          this.userResume = res.resume;
          // this.resumeUrl = this.userResume.resumeUrl;
          this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.userResume.resumeUrl !== undefined
              ? this.userResume.resumeUrl
              : ''
          );
        }
        this.spinner.hideSpinner();
        // this.resumeForm.get('resumeUrl')?.setValue(this.userResume.resumeUrl || '');
      },
      (error) => {
        this.spinner.hideSpinner();
        console.log(error);
        this.toastr.error('Error in retrieving resume');
      }
    );
  }

  onDel() {
    this.resumeExists = !this.resumeExists;
  }

  add() {
    this.resumeService.addResumeByCandidateId(this.resumeUrl).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('Resume link added');
        this.ngOnInit();
      },
      (error) => {
        console.log('Error in adding resume link', error);
        this.toastr.error('Could not add resume');
      }
    );
  }

  update() {
    this.resumeService
      .removeResumeByResumeId(this.userResume.resumeId)
      .subscribe(
        (res) => {
          console.log(res);

          if (res.status === 200) {
            this.uploadFile()
              .then(() => {
                document.getElementById('closedUpload')?.click();
                this.toastr.success('Resume updated successfully', undefined, {
                  timeOut: 5000,
                });
              })
              .catch((err) => {
                console.log('error while uploading data', err);
              });
          } else {
            this.toastr.error(res.message);
          }
          // this.add();
          // this.toastr.success("Resume linked updated successfully");
        },
        (error) => {
          console.log(error);
          this.toastr.error('Error in updating resume');
        }
      );
  }

  handleFileChange(event: any): void {
    this.file = event.target.files[0];
    this.fileSelected = true;
  }

  async uploadFile(): Promise<void> {
    if (!this.file) {
      return;
    }

    const uniqueUploadId = this.generateUniqueUploadId();
    const chunkSize = 5 * 1024 * 1024;
    const totalChunks = Math.ceil(this.file.size / chunkSize);
    let currentChunk = 0;
    this.uploading = true;

    const uploadChunk = async (start: number, end: number): Promise<void> => {
      const formData = new FormData();
      formData.append('file', this.file!.slice(start, end));
      formData.append('cloud_name', 'ajay-twitter-cloud');
      formData.append('upload_preset', 'jobPortal_pdf');
      formData.append('folder', 'pdf');

      console.log('file info ', this.file!.slice(start, end));

      const contentRange = `bytes ${start}-${end - 1}/${this.file!.size}`;
      console.log(
        `Uploading chunk for uniqueUploadId: ${uniqueUploadId}; start: ${start}, end: ${
          end - 1
        }`
      );
      try {
        const response = await this.http
          .post(
            `https://api.cloudinary.com/v1_1/ajay-twitter-cloud/auto/upload`,
            formData,
            {
              headers: {
                'X-Unique-Upload-Id': uniqueUploadId,
                'Content-Range': contentRange,
              },
            }
          )
          .toPromise();
        currentChunk++;
        if (currentChunk < totalChunks) {
          const nextStart = currentChunk * chunkSize;
          const nextEnd = Math.min(nextStart + chunkSize, this.file!.size);
          uploadChunk(nextStart, nextEnd);
        } else {
          this.uploadComplete = true;
          this.uploading = false;
          this.cldResponse = response;
          // console.log(this.cldResponse.url);
          //  console.log((this.cldResponse.url))
          this.temp = this.cldResponse.url;
          this.temp = this.temp.replace('http://', 'https://');

          this.userResume.resumeUrl = this.temp;
          this.resumeUrl = this.temp;
          this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.temp
          );
          this.add();
        }
      } catch (error) {
        this.toastr.error('Error uploading', undefined, { timeOut: 5000 });
        this.uploading = false;
      }
    };

    const start = 0;
    const end = Math.min(chunkSize, this.file.size);
    uploadChunk(start, end)
      .then(() => {
        this.toastr.success('File uploaded', undefined, { timeOut: 5000 });
      })
      .catch(() => {
        document.getElementById('closedUpload')?.click();
      });
  }

  generateUniqueUploadId(): string {
    return `uqid-${Date.now()}`;
  }

  safe() {
    return this.sanitizer.bypassSecurityTrustUrl(this.temp);
  }
}
