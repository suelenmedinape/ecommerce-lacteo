import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    CookieService
  ]
};