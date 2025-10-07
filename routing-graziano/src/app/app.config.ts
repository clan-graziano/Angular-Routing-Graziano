import { ApplicationConfig, OnInit, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), //QUI
    
  ]
};

export const serverURI = 'https://super-couscous-jjjxx499xpr9fq9px-5000.app.github.dev/'; // Replace with your actual server URI
  