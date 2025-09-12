import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './core/interceptors/Header/header-interceptor';
import { errorInterceptor } from './core/interceptors/Error/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions(), withInMemoryScrolling()),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor, errorInterceptor])),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    importProvidersFrom(CookieService),
    provideToastr(),
  ],
};
