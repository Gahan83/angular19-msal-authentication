import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { MSAL_INSTANCE, MsalService } from '@azure/msal-angular';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '69719854-0ddd-4ec9-b5ae-07f172e4a415',
      authority: 'https://login.microsoftonline.com/4f250e01-3c2b-4951-a60e-a52af262c6b7',
      redirectUri: 'http://localhost:4200'
    }
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideProtractorTestingSupport(),
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService
  ]
};
