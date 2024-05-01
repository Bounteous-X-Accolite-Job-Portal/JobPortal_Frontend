import { Routes } from '@angular/router';
import { LandingComponent } from './Components/landing/landing.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { JobsComponent } from './Components/jobs/jobs.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { JobHomeComponent } from './Components/job-home/job-home.component';

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
        path: 'user-profile',
        component: UserProfileComponent
    },
    {
        path: 'edit-profile',
        component: EditProfileComponent
    },
    {
        path: '**',
        component: LandingComponent
    },
    {
        path: 'Job-Home',
        component: JobHomeComponent
    }
];
