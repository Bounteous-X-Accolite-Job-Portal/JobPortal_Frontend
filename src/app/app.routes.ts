import { Routes } from '@angular/router';
import { LandingComponent } from './Components/landing/landing.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { AddJobComponent } from './Components/Employee/add-job/add-job.component';
import { JobHomeComponent } from './Components/job-home/job-home.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { TryComponent } from './Components/try/try.component';
import { CandidateEducationComponent } from './Components/candidate-education/candidate-education.component';
import { ExperienceComponent } from './Components/experience/experience.component';
import { PersonalInfoComponent } from './Components/personal-info/personal-info.component';
import { SkillsComponent } from './Components/skills/skills.component';
import { ResumeComponent } from './Components/resume/resume.component';
import { SocialProfilesComponent } from './Components/social-profiles/social-profiles.component';
import { PasswordResetComponent } from './Components/password-reset/password-reset.component';
import { authGuard } from './Guards/auth.guard';
import { childAuthGuard } from './Guards/child-auth.guard';
import { loggedInGuard } from './Guards/logged-in.guard';

import { EmployeeDashboardComponent } from './Components/Employee/employee-dashboard/employee-dashboard.component';
import { InterviewHubComponent } from './Components/Employee/interview-hub/interview-hub.component';
import { InterviewComponent } from './Components/Employee/interview/interview.component';
import { SettingsComponent } from './Components/Employee/settings/settings.component';
import { JobdetailsComponent } from './Components/jobdetails/jobdetails.component';
import { JobApplicatonComponent } from './Components/job-applicaton/job-applicaton.component';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full'
    },
    {
        path: 'landing',
        component: LandingComponent
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [loggedInGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [loggedInGuard]
    },
    {
      path: 'add-employee',
      component: AddEmployeeComponent,
    },
    {
        path: 'jobs',
        component: JobHomeComponent,
    },
    {
      path: 'job-details/:jobId',
      component: JobdetailsComponent,
    },
    {
      path: 'apply-now/:jobId',
      component:JobApplicatonComponent,
    }, 
    {
      path: 'user-profile',
      component: UserProfileComponent,
    }, 
    {
        path: 'try',
        component: TryComponent
    },
    {
      path: 'employee-dashboard',
      component: EmployeeDashboardComponent,
      canActivate: [authGuard],
      canActivateChild: [childAuthGuard],
      children: [
        { path: 'add-job', component: AddJobComponent },
        { path: 'interview', component: InterviewComponent },
        { path: 'interview-hub', component: InterviewHubComponent },
        { path: 'settings', component: SettingsComponent}
      ],
    },
    {
        path: 'profile',
        component: UserProfileComponent,
        canActivate: [authGuard],
        canActivateChild: [childAuthGuard],
        children: [
            { path: 'edu', component: CandidateEducationComponent },
            { path: 'exp', component: ExperienceComponent },
            { path: 'per-info', component: PersonalInfoComponent },
            { path: 'skills', component: SkillsComponent },
            { path: 'resume', component: ResumeComponent },
            { path: 'sml', component: SocialProfilesComponent },
            { path: 'pass-reset', component: PasswordResetComponent },
            {path: 'applyjobs' , component: JobHomeComponent},
            { path: '', component: TryComponent},
            { path: '**', component: TryComponent}
        ]
    },

];

export default routes;
