import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { PermissionService } from './Services/permission.service';
import {CookieService} from 'ngx-cookie-service';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { tokenInterceptor } from './Interceptors/token.interceptor';
import { FilterPipe } from './Models/filter.pipe';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    PermissionService,
    provideHttpClient(withFetch(),withInterceptors([tokenInterceptor])),
    CookieService,
    provideAnimationsAsync(),
    provideToastr()
  ]
    
};
