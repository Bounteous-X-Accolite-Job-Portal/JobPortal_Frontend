import { Component, inject } from '@angular/core';
import { Job } from '../../../Models/JobResponse/Job';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Services/auth.service';
import { UserStoreService } from '../../../Services/user-store.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JobService } from '../../../Services/Job/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Degree } from '../../../Models/DegreeResponse/Degree';
import { JobCategory } from '../../../Models/JobCategoryResponse/JobCategory';
import { position } from '../../../Models/JobPositionResponse/position';
import { JobType } from '../../../Models/JobTypeResponse/JobType';
import { location } from '../../../Models/JoblocationResponse/location';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.css',
})
export class EditJobComponent {
  job!: Job;
  userId: string = '';
  isLoading: boolean = false;
  submitting: boolean = false;
  submitted: boolean = false;

  locations: location[] = [];
  jobTypes: JobType[] = [];
  jobCategories: JobCategory[] = [];

  jobPositions: position[] = [];
  categoryjobPositions: position[] = [];

  degrees: Degree[] = [];

  route: ActivatedRoute = inject(ActivatedRoute);
  jobForm = this.fb.group({
    jobCode: ['', Validators.required],
    jobDescription: ['', Validators.required],
    jobTitle: ['', Validators.required],
    degreeId: ['', Validators.required],
    categoryId: ['', Validators.required],
    positionId: ['', Validators.required],
    locationId: ['', Validators.required],
    jobType: ['', Validators.required],
    experience: ['', Validators.required],
    lastDate: ['', Validators.required],
  });
  f: any;

  constructor(
    private userStore: UserStoreService,
    private auth: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = String(this.route.snapshot.params['id']);
    this.loadJob(id);

    this.userStore.getIdFromStore().subscribe((val) => {
      console.log(val);
      let idFromToken = this.auth.getIdFromToken();
      console.log(idFromToken);
      this.userId = val || idFromToken;
      console.log('Logged User Id : ', this.userId);
    });

    this.locations.push({
      locationId: 'null',
      address: 'Select Job Location ',
      city: '',
      state: '',
      country: '',
    });
    this.loadJobLocations();

    this.jobTypes.push({ jobTypeId: 'null', typeName: ' Select Job Type ' });
    this.loadJobTypes();

    this.jobCategories.push({
      categoryId: 'null',
      categoryCode: 'Select Job Category ',
      categoryName: '',
      description: '',
    });
    this.loadJobCategories();

    this.categoryjobPositions.push({
      positionId: 'null',
      positionName: 'Select Job Position ',
      positionCode: '',
      description: '',
      categoryId: 'null',
    });
    this.loadJobPositions();

    this.degrees.push({
      degreeId: 'null',
      degreeName: 'Select Degree ',
      durationInYears: 0,
    });
    this.loadDegrees();
  }

  private loadJob(id: string): void {
    this.jobService.getJobById(id).subscribe(
      (res) => {
        console.log('feteched : ', res);
        this.job = res.job;
        console.log(this.job);

        this.jobForm.get('jobCode')?.setValue(this.job.jobCode);
        this.jobForm.get('jobDescription')?.setValue(this.job.jobDescription);
        this.jobForm.get('jobTitle')?.setValue(this.job.jobTitle);
        this.jobForm.get('degreeId')?.setValue(this.job.degreeId || '');
        this.jobForm.get('categoryId')?.setValue(this.job.categoryId || '');
        this.jobForm.get('positionId')?.setValue(this.job.positionId || '');
        this.jobForm.get('locationId')?.setValue(this.job.locationId || '');
        this.jobForm.get('jobType')?.setValue(this.job.jobType || '');
        this.jobForm.get('experience')?.setValue(this.job.experience);
        this.jobForm.get('lastDate')?.setValue(this.job.lastDate);

        this.loadJobPositionsByCategoryId(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private loadJobLocations(): void {
    this.jobService.getAllJobLocations().subscribe(
      (res) => {
        this.locations = this.locations.concat(res.allJobLocations);
      },
      (error) => {
        console.error('Error loading job locations:', error);
      }
    );
  }

  private loadJobCategories(): void {
    this.jobService.getAllJobCategories().subscribe(
      (res) => {
        this.jobCategories = this.jobCategories.concat(res.allJobCategory);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading job locations:', error);
      }
    );
  }

  private loadJobTypes(): void {
    this.jobService.getAllJobTypes().subscribe(
      (res) => {
        this.jobTypes = this.jobTypes.concat(res.allJobTypes);
      },
      (error) => {
        console.error('Error loading job types:', error);
      }
    );
  }
  private loadJobPositions(): void {
    this.jobService.getAllJobPosition().subscribe(
      (res) => {
        this.jobPositions = res.allJobPositions;
      },
      (error) => {
        console.error('Error loading job types:', error);
      }
    );
  }

  private loadDegrees(): void {
    this.jobService.getAllDegrees().subscribe(
      (res) => {
        this.degrees = this.degrees.concat(res.degrees);
      },
      (error) => {
        console.error('Error loading Degrees:', error);
      }
    );
  }

  onSubmit(): void {
    this.isLoading = true;
    console.log('job form :', this.jobForm.value);

    this.job.jobCode = this.jobForm.get('jobCode')?.value || '';
    this.job.jobDescription = this.jobForm.get('jobDescription')?.value || '';
    this.job.jobTitle = this.jobForm.get('jobTitle')?.value || '';
    this.job.degreeId = this.jobForm.get('degreeId')?.value || '';
    this.job.categoryId = this.jobForm.get('categoryId')?.value || '';
    this.job.positionId = this.jobForm.get('positionId')?.value || '';
    this.job.locationId = this.jobForm.get('locationId')?.value || '';
    this.job.jobType = this.jobForm.get('jobType')?.value || '';
    this.job.experience = this.jobForm.get('experience')?.value || '';
    this.job.lastDate = this.jobForm.get('lastDate')?.value || '';

    console.log('updt job : ', this.job);
    this.jobService.updateJob(this.job).subscribe(
      (res) => {
        // console.log(res);
        if (res.status == 200) {
          this.toastr.success('Job Updated Successfully !!');
          this.router.navigate(['../']);
        } else if (res.status == 403) {
          this.toastr.info('Job NOT Updated !!');
        }
      },
      (error) => {
        // console.log(error);
        this.toastr.error('Error: ', error);
      }
    );
    this.isLoading = false;
  }

  public loadJobPositionsByCategoryId(flg: Boolean): void {
    if (flg) var selectedCategoryId = this.jobForm.get('categoryId')?.value;
    else selectedCategoryId = this.job.categoryId;

    this.categoryjobPositions = [];
    this.categoryjobPositions.push({
      positionId: 'null',
      positionName: 'Select Job Position ',
      positionCode: '',
      description: '',
      categoryId: 'null',
    });

    this.jobPositions.forEach((pos) => {
      if (selectedCategoryId === pos.categoryId)
        this.categoryjobPositions.push(pos);
    });
  }
}
