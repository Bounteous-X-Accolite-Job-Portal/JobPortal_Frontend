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
import { PasswordResetComponent } from './Components/password-reset/password-reset.component';

// export const childRoutes: Routes = [
//     { path: 'child1', component: LoginComponent },
//     { path: 'child2', component: RegisterComponent}
// ];


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
        path: 'profile',
        component: UserProfileComponent,
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
        pathMatch: 'full'
    },
    {
        path: '**',
        component: LandingComponent
    }
];


  