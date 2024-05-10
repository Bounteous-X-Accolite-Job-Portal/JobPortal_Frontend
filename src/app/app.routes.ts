import { Routes } from '@angular/router';
import { LandingComponent } from './Components/landing/landing.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { AddJobComponent } from './Components/Employee/add-job/add-job.component';
import { JobHomeComponent } from './Components/job-home/job-home.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { TryComponent } from './Components/try/try.component';
import { ExperienceComponent } from './Components/Candidate/experience/experience.component';
import { PersonalInfoComponent } from './Components/Candidate/personal-info/personal-info.component';
import { SkillsComponent } from './Components/Candidate/skills/skills.component';
import { ResumeComponent } from './Components/Candidate/resume/resume.component';
import { SocialProfilesComponent } from './Components/Candidate/social-profiles/social-profiles.component';
import { PasswordResetComponent } from './Components/Candidate/password-reset/password-reset.component';
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
        path: 'about',
        component: AddEducationComponent
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
        path: 'update',
        component: UpdateEducationComponent
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
        // canActivate: [authGuard],
        // canActivateChild: [childAuthGuard],
        children: [
            { path: 'edu/:id', component: CandidateEducationComponent },
            { path: 'edu/:id', children:[
                { path: 'add-edu' , component: AddEducationComponent},
                { path: 'update-edu' , component: UpdateEducationComponent},
            ] },
            { path: 'exp/:id', component: ExperienceComponent },
            { path: 'exp/:id', children:[
                { path: 'add-exp' , component: AddExperienceComponent},
                { path: 'update-exp' , component: UpdateExperienceComponent},
            ] },
            { path: 'per-info/:id', component: PersonalInfoComponent },
            { path: 'skills/::id', component: SkillsComponent },
            { path: 'resume/:id', component: ResumeComponent },
            { path: 'sml/:id', component: SocialProfilesComponent },
            { path: 'pass-reset/:id', component: PasswordResetComponent },
            { path: 'applyjobs/:id', component: JobHomeComponent},
            { path: '**', component: TryComponent}
        ]
    },

];

export default routes;
