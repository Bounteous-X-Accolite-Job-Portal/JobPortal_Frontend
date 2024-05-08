import { Routes } from '@angular/router';
import { LandingComponent } from './Components/landing/landing.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { TryComponent } from './Components/try/try.component';
import { CandidateEducationComponent } from './Components/candidate-education/candidate-education.component';
import { ExperienceComponent } from './Components/experience/experience.component';
import { PersonalInfoComponent } from './Components/personal-info/personal-info.component';
import { SkillsComponent } from './Components/skills/skills.component';
import { ResumeComponent } from './Components/resume/resume.component';
import { SocialProfilesComponent } from './Components/social-profiles/social-profiles.component';
import { PasswordResetComponent } from './Components/password-reset/password-reset.component';
import { JobHomeComponent } from './Components/job-home/job-home.component';
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
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'try',
        component: TryComponent
    },
    {
        path: 'profile',
        component: UserProfileComponent,
        // canActivate: [authGuard],
        children: [
            { path: 'edu', component: CandidateEducationComponent },
            { path: 'exp', component: ExperienceComponent },
            { path: 'per-info', component: PersonalInfoComponent },
            { path: 'skills', component: SkillsComponent },
            { path: 'resume', component: ResumeComponent },
            { path: 'sml', component: SocialProfilesComponent },
            { path: 'pass-reset', component: PasswordResetComponent },
            { path: '', component: TryComponent},
            { path: '**', component: TryComponent}
        ]
    },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
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
    path: '**',
    component: LandingComponent,
  },

];

export default routes;
