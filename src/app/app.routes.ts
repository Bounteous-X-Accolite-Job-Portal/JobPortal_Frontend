import { Routes } from '@angular/router';
import { LandingComponent } from './Components/landing/landing.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { JobsComponent } from './Components/jobs/jobs.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { TryComponent } from './Components/try/try.component';
import { CandidateEducationComponent } from './Components/candidate-education/candidate-education.component';
import { ExperienceComponent } from './Components/experience/experience.component';
import { PersonalInfoComponent } from './Components/personal-info/personal-info.component';
import { SkillsComponent } from './Components/skills/skills.component';
import { ResumeComponent } from './Components/resume/resume.component';
import { SocialProfilesComponent } from './Components/social-profiles/social-profiles.component';
import { ForgetPasswordComponentComponent } from './forget-password-component/forget-password-component.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmailComponentChangePasswordComponent } from './email-component-change-password/email-component-change-password.component';



// export const childRoutes: Routes = [
//     { path: 'child1', component: LoginComponent },
//     { path: 'child2', component: RegisterComponent}
// ];


import { authGuard } from './Guards/auth.guard';

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
        path: 'jobs',
        component: JobsComponent
    },
    {
        path: 'try',
        component: TryComponent
    },
    {
        path:'reset',
    component:ForgetPasswordComponentComponent},
    {
        path:'changePasswordEmail',
        component:EmailComponentChangePasswordComponent

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
            { path: 'changePassword', component: ChangePasswordComponent},
            { path: '**', component: TryComponent},
     
        ]
    },
    {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: LandingComponent
    }

];


  