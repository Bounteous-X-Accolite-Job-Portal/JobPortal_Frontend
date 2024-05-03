import { Routes } from '@angular/router';
import { LandingComponent } from './Components/landing/landing.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { AddJobComponent } from './Components/add-job/add-job.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { JobHomeComponent } from './Components/job-home/job-home.component';
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
    path: 'edit-profile',
    component: EditProfileComponent,
  },
  {
    path: 'add-employee',
    component: AddEmployeeComponent
  },
  {
    path: 'add-job',
    component: AddJobComponent
  },
  {
    path: '**',
    component: LandingComponent,
  },
  
];
