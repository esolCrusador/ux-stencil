import { NgModule } from '@angular/core';
import { AuthProviderFactory } from './providers/auth-provider.factory';
import { IAuthProvider } from './providers/i-auth.provider';
import { FacebookAuthProvider } from './providers/facebook-auth.provider';
import { GoogleAuthProvider } from './providers/google-auth.provider';
import { AuthApiClient } from './api-clients/auth.api-client';
import { AuthService } from './services/auth.service';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ControlsModule } from '@ux-stencil/controls/controls.module';
import { AuthGuard } from './services/auth.guard';
import { AuthActionsService } from './services/auth-actions.service';

@NgModule({
  imports: [
    ControlsModule,
  ],

  providers: [
    AuthService,
    AuthApiClient,
    AuthGuard,
    AuthActionsService,

    AuthProviderFactory,
    { provide: IAuthProvider, useClass: FacebookAuthProvider, multi: true },
    { provide: IAuthProvider, useClass: GoogleAuthProvider, multi: true },
  ],

  declarations: [
    SignInComponent,
  ],

  entryComponents: [
    SignInComponent,
  ]
})
export class AuthModule {
}
