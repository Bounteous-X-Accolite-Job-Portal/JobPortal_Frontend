import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  file: File | null = null;
  uploading = false;
  uploadComplete = false;
  cldResponse: any;
  productImageUrl: string | undefined;
  @Output() close = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    // private router: Router,
    private toastr: ToastrService
  ) {}
  handleFileChange(event: any): void {
    this.file = event.target.files[0];
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

      console.log("file info ", this.file!.slice(start, end));

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
          this.toastr.success('File uploaded', undefined, { timeOut: 5000 });
          console.log(this.cldResponse.url);
          // this.product.productImageUrl = this.cldResponse.url;
        }
      } catch (error) {
        this.toastr.error('Error uploading', undefined, { timeOut: 5000 });
        this.uploading = false;
      }
    };
    const start = 0;
    const end = Math.min(chunkSize, this.file.size);
    uploadChunk(start, end);
  }
  generateUniqueUploadId(): string {
    return `uqid-${Date.now()}`;
  }
  
}
