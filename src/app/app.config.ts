import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { PermissionService } from './Services/permission.service';
import {CookieService} from 'ngx-cookie-service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { tokenInterceptor } from './Interceptors/token.interceptor';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(),
    PermissionService,
    provideHttpClient(withInterceptors([tokenInterceptor])),
    CookieService,
    provideAnimationsAsync(),
    provideToastr()
  ]
    
};
