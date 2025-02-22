import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { PermissionService } from './Services/permission.service';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { tokenInterceptor } from './Interceptors/token.interceptor';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    PermissionService,
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimationsAsync(),
    ReactiveFormsModule, // Include ReactiveFormsModule here,
    provideToastr({
      timeOut: 5000,
      closeButton: true,
    })
  ]
};
