import { Routes } from '@angular/router';
import { LandingComponent } from './Components/landing/landing.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AddJobComponent } from './Components/Employee/add-job/add-job.component';
import { JobHomeComponent } from './Components/job-home/job-home.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { TryComponent } from './Components/try/try.component';
import { ExperienceComponent } from './Components/Candidate/experience/experience.component';
import { PersonalInfoComponent } from './Components/Candidate/personal-info/personal-info.component';
import { SkillsComponent } from './Components/Candidate/skills/skills.component';
import { ResumeComponent } from './Components/Candidate/resume/resume.component';
import { SocialProfilesComponent } from './Components/Candidate/social-profiles/social-profiles.component';
import { AddEducationComponent } from './Components/Candidate/add-education/add-education.component';
import { UpdateEducationComponent } from './Components/Candidate/update-education/update-education.component';
import { AddExperienceComponent } from './Components/Candidate/add-experience/add-experience.component';
import { UpdateExperienceComponent } from './Components/Candidate/update-experience/update-experience.component';
import { CandidateEducationComponent } from './Components/Candidate/candidate-education/candidate-education.component';
import { authGuard } from './Guards/auth.guard';
import { childAuthGuard } from './Guards/child-auth.guard';
import { loggedInGuard } from './Guards/logged-in.guard';
import { EmployeeDashboardComponent } from './Components/Employee/employee-dashboard/employee-dashboard.component';
import { InterviewHubComponent } from './Components/Employee/interview-hub/interview-hub.component';
import { InterviewComponent } from './Components/Employee/interview/interview.component';
import { JobdetailsComponent } from './Components/jobdetails/jobdetails.component';
import { ReferralServiceService } from './referral-service.service';
import { ReferralComponent } from './Components/Employee/get-referralOfEmp/referral.component';
import { CrudCategoryJobDataComponent } from './Components/Employee/crud-category-job-data/crud-category-job-data.component';
import { CrudPositionJobDataComponent } from './Components/Employee/crud-position-job-data/crud-position-job-data.component';
import { CrudTypesJobDataComponent } from './Components/Employee/crud-types-job-data/crud-types-job-data.component';
import { CrudLocationJobDataComponent } from './Components/Employee/crud-location-job-data/crud-location-job-data.component';
import { CrudDegreeDataComponent } from './Components/Employee/crud-degree-data/crud-degree-data.component';
import { CrudInstitutionDataComponent } from './Components/Employee/crud-institution-data/crud-institution-data.component';
import { AddEmployeeComponent } from './Components/Employee/add-employee/add-employee.component';
import { AppliedJobsComponent } from './Components/Candidate/applied-jobs/applied-jobs.component';
import { EditJobComponent } from './Components/Employee/edit-job/edit-job.component';
import { AddReferralComponent } from './Components/Employee/add-referral/add-referral.component';
import { AboutComponent } from './Components/about/about.component';
import { CrudCompanyDataComponent } from './Components/Employee/crud-company-data/crud-company-data.component';
import { employeeGuardGuard } from './Guards/employee-guard.guard';
import { childEmployeeGuardGuard } from './Guards/child-employee-guard.guard';
import { candidateGuard } from './Guards/candidate.guard';
import { candidateChildGuard } from './Guards/candidate-child.guard';
import { hasPrivilegeGuard } from './Guards/has-privilege.guard';
import { hasSpecialPrivilegeGuard } from './Guards/has-special-privilege.guard';
import { hasSpecialPrivilegeChildGuard } from './Guards/has-special-privilege-child.guard';
import { JobApplicantComponent } from './Components/JobApplication/job-applicant/job-applicant.component';
import { YourJobsComponent } from './Components/Employee/your-jobs/your-jobs.component';
import { DisablePrivilegeComponent } from './Components/Employee/disable-privilege/disable-privilege.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {path:'referral',component:ReferralComponent},
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'jobs',
    component: JobHomeComponent,
  },
  {
    path: 'jobs/:jobId/applicants',
    component: JobApplicantComponent,
  },
  {
    path: 'closedJobs/:closedJobId/applicants',
    component: JobApplicantComponent,
  },
  {
    path: 'job-details/:jobId',
    component: JobdetailsComponent,
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
  },
  {
    path: 'try',
    component: TryComponent,
  },
  {
    path: 'update',
    component: UpdateEducationComponent,
  },
  {
    path: 'crud-job-data',
    component: CrudCategoryJobDataComponent,
  },
  {
    path: 'edit-job/:id',
    component: EditJobComponent,
  },
  {
    path: 'employee-dashboard',
    component: EmployeeDashboardComponent,
    canActivate: [authGuard, employeeGuardGuard],
    canActivateChild: [childAuthGuard, childEmployeeGuardGuard],
    children: [
      {
        path: 'add-job',
        component: AddJobComponent,
        canActivate: [hasPrivilegeGuard],
      },
      { path: 'interview', component: InterviewComponent },
      { path: 'interview-hub', component: InterviewHubComponent },
      {path:'referral',component:ReferralComponent},
      {path:'addReferral',component:AddReferralComponent},
      
      {
        path: 'disable-employee-privilege',
        component: DisablePrivilegeComponent,
        
      },
      { path: 'add-employee', component: AddEmployeeComponent },
      {
        path: 'settings',
        canActivate: [hasSpecialPrivilegeGuard],
        canActivateChild: [hasSpecialPrivilegeChildGuard],
        children: [
          {
            path: 'crud-category-job-data',
            component: CrudCategoryJobDataComponent,
          },
          {
            path: 'crud-position-job-data',
            component: CrudPositionJobDataComponent,
          },
          { path: 'crud-types-job-data', component: CrudTypesJobDataComponent },
          {
            path: 'crud-location-job-data',
            component: CrudLocationJobDataComponent,
          },
          { path: 'crud-degree-data', component: CrudDegreeDataComponent },
          {
            path: 'crud-institution-data',
            component: CrudInstitutionDataComponent,
          },
          { path: 'crud-company-data', component: CrudCompanyDataComponent },
        ],
      },
      { path: 'your-jobs', component: YourJobsComponent },
    ],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [authGuard, candidateGuard],
    canActivateChild: [childAuthGuard, candidateChildGuard],
    children: [
      { path: 'edu', component: CandidateEducationComponent },
      {
        path: 'edu',
        children: [
          { path: 'add-edu', component: AddEducationComponent },
          { path: 'update-edu/:id', component: UpdateEducationComponent },
        ],
      },
      { path: 'exp', component: ExperienceComponent },
      {
        path: 'exp',
        children: [
          { path: 'add-exp', component: AddExperienceComponent },
          { path: 'update-exp/:id', component: UpdateExperienceComponent },
        ],
      },
      { path: 'per-info', component: PersonalInfoComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'resume', component: ResumeComponent },
      { path: 'sml', component: SocialProfilesComponent },
      { path: 'applied-jobs', component: AppliedJobsComponent},
      { path: 'per-info/:id', component: PersonalInfoComponent },
      { path: 'skills/::id', component: SkillsComponent },
      { path: 'resume/:id', component: ResumeComponent },
      { path: 'sml/:id', component: SocialProfilesComponent },
      // { path: '', component: TryComponent},
      { path: 'applied-jobs', component: AppliedJobsComponent },
      { path: '**', component: TryComponent },
      
    ],
  },
];

export default routes;
