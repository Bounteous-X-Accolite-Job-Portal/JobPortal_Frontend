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
import { AddEducationComponent } from './Components/add-education/add-education.component';
import { UpdateEducationComponent } from './Components/update-education/update-education.component';
import { AddExperienceComponent } from './Components/add-experience/add-experience.component';
import { UpdateExperienceComponent } from './Components/update-experience/update-experience.component';
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
        path: 'update',
        component: UpdateEducationComponent
    },
    {
        path: 'profile',
        component: UserProfileComponent,
        // canActivate: [authGuard],
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


  