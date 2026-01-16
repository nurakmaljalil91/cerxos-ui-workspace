import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HomePageComponent } from './home-page.component';
import { LoginPageComponent } from './login-page.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter([
      { path: '', component: HomePageComponent },
      { path: 'login', component: LoginPageComponent }
    ])
  ]
};
