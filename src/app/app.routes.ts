import { Routes } from '@angular/router';
import { LandingComponent } from './Components/landing/landing.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { JobsComponent } from './Components/jobs/jobs.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { Child1Component } from './Components/user-profile/child1/child1.component';

// export const childRoutes: Routes = [
//     { path: 'child1', component: LoginComponent },
//     { path: 'child2', component: RegisterComponent}
// ];


export const routes: Routes = [
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
        path: 'dashboard',
        component: UserProfileComponent,
        children: [
            { path: 'child1', component: Child1Component },
            { path: '', component: Child1Component}
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


  