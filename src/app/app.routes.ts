import { Routes } from '@angular/router';
import { LandingComponent } from './Components/landing/landing.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { JobHomeComponent } from './Components/job-home/job-home.component';
import { JobdetailsComponent } from './Components/jobdetails/jobdetails.component';
import { JobApplicatonComponent } from './Components/job-applicaton/job-applicaton.component';
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
    path: 'user-profile',
    component: UserProfileComponent,
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
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
    path: '**',
    component: LandingComponent,
  },

];
export default routes;
