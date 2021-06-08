import { NgModule } from '@angular/core';
import { AuthProviderFactory } from './providers/auth-provider.factory';
import { IAuthProvider } from './providers/i-auth.provider';
import { FacebookAuthProvider } from './providers/facebook-auth.provider';
import { GoogleAuthProvider } from './providers/google-auth.provider';
import { AuthApiClient } from './api-clients/auth.api-client';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
  ],

  providers: [
    AuthService,
    AuthApiClient,

    AuthProviderFactory,
    { provide: IAuthProvider, useClass: FacebookAuthProvider, multi: true },
    { provide: IAuthProvider, useClass: GoogleAuthProvider, multi: true },
  ],

  declarations: [
  ],

  entryComponents: [
  ]
})
export class AuthModule {
}
