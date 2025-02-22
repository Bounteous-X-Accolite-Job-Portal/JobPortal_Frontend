import { Routes } from '@angular/router';
import { LandingComponent } from './Components/landing/landing.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AddJobComponent } from './Components/Employee/add-job/add-job.component';
import { JobHomeComponent } from './Components/job-home/job-home.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
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
import { InterviewComponent } from './Components/JobApplication/interview/interview.component';
import { JobdetailsComponent } from './Components/jobdetails/jobdetails.component';
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
import { JobApplicantComponent } from './Components/JobApplication/job-applicant/job-applicant.component';
import { YourJobsComponent } from './Components/Employee/your-jobs/your-jobs.component';
import { DisablePrivilegeComponent } from './Components/Employee/disable-privilege/disable-privilege.component';
import { ForgetPasswordComponentComponent } from './Components/forget-password-component/forget-password-component.component';
import { DesignationComponent } from './Components/Employee/designation/designation.component';
import { SettingsComponent } from './Components/Employee/settings/settings.component';
import { ProfileComponent } from './Components/Employee/profile/profile.component';
import { CrudStatusJobDataComponent } from './Components/Employee/crud-status-job-data/crud-status-job-data.component';
import { EmailComponentChangePasswordComponent } from './Components/email-component-change-password/email-component-change-password.component';
import { OfferLetterComponent } from './Components/Employee/offer-letter/offer-letter.component';
import { hasPrivilegeChildGuard } from './Guards/has-privilege-child.guard';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { UploadComponent } from './Components/upload/upload.component';

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
  // { 
  //   path: 'referral', 
  //   component: ReferralComponent,
  //   canActivate: [authGuard, employeeGuardGuard]
  // },
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
    path: 'forgot-password',
    component: ForgetPasswordComponentComponent,
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
    canActivate: [authGuard, employeeGuardGuard, hasPrivilegeGuard]
  },
  {
    path: 'application/:applicationId/scheduleInterview',
    component: InterviewComponent,
    canActivate: [authGuard, employeeGuardGuard, hasPrivilegeGuard]
  },
  {
    path: 'closedJobs/:closedJobId/applicants',
    component: JobApplicantComponent,
    canActivate: [authGuard, employeeGuardGuard, hasPrivilegeGuard]
  },
  {
    path: 'job-details/:jobId',
    component: JobdetailsComponent,
  },
  {
    path: 'upload',
    component: UploadComponent,
  },
  {
    path: 'closedJob/job-details/:closedJobId',
    component: JobdetailsComponent,
    canActivate: [authGuard, employeeGuardGuard, hasPrivilegeGuard]
  },
  {
    path: 'crud-job-data',
    component: CrudCategoryJobDataComponent,
    canActivate: [authGuard, employeeGuardGuard, hasPrivilegeGuard]
  },
  {
    path: 'edit-job/:id',
    component: EditJobComponent,
    canActivate: [authGuard, employeeGuardGuard, hasPrivilegeGuard]
  },
  {
    path: 'employee-dashboard',
    component: EmployeeDashboardComponent,
    canActivate: [authGuard, employeeGuardGuard],
    canActivateChild: [childAuthGuard, childEmployeeGuardGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      {
        path: 'change-password',
        component: EmailComponentChangePasswordComponent,
      },
      {
        path: 'add-job', 
        component: AddJobComponent, 
        canActivate: [hasPrivilegeGuard],
      },
      { path: 'interview-hub', component: InterviewHubComponent },
      { path: 'referral', component: ReferralComponent },
      { path: 'addReferral/:id', component: AddReferralComponent},
      {
        path: 'allEmployees',
        component: DisablePrivilegeComponent,
        canActivate: [hasSpecialPrivilegeGuard],
      },
      { 
        path: 'add-employee', 
        component: AddEmployeeComponent,
        canActivate: [hasPrivilegeGuard],
      },
      { path: 'settings', component: SettingsComponent, canActivate: [hasPrivilegeGuard] },
      {
        path: 'settings',
        canActivate: [hasPrivilegeGuard],
        canActivateChild: [hasPrivilegeChildGuard],
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
          {
            path: 'crud-status-job-data',
            component: CrudStatusJobDataComponent,
          },
        ],
      },
      { path: 'your-jobs', component: YourJobsComponent },
      { 
        path: 'designation', 
        component: DesignationComponent,
        canActivate: [hasPrivilegeGuard],
      },
      { 
        path: 'jobOffered', 
        component: OfferLetterComponent,
        canActivate: [hasPrivilegeGuard, hasSpecialPrivilegeGuard],
      },
      { path: '', component: ProfileComponent },
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
        canActivate: [candidateGuard],
        canActivateChild: [candidateChildGuard],
        children: [
          { path: 'add-edu', component: AddEducationComponent },
          { path: 'update-edu/:id', component: UpdateEducationComponent },
        ],
      },
      { path: 'exp', component: ExperienceComponent },
      {
        path: 'exp',
        canActivate: [candidateGuard],
        canActivateChild: [candidateChildGuard],
        children: [
          { path: 'add-exp', component: AddExperienceComponent },
          { path: 'update-exp/:id', component: UpdateExperienceComponent },
        ],
      },
      { path: 'per-info', component: PersonalInfoComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'resume', component: ResumeComponent },
      { path: 'sml', component: SocialProfilesComponent },
      { path: 'applied-jobs', component: AppliedJobsComponent },
      { path: 'per-info/:id', component: PersonalInfoComponent },
      { path: 'skills/::id', component: SkillsComponent },
      { path: 'resume/:id', component: ResumeComponent },
      { path: 'sml/:id', component: SocialProfilesComponent },
      {
        path: 'changePassword',
        component: EmailComponentChangePasswordComponent,
      },
      { path: '', component: PersonalInfoComponent },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

export default routes;
