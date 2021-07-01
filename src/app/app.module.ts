import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingModule } from './features/landing/landing.module';
import { ControlsModule } from './features/controls/controls.module';
import { AddressModule } from './features/address/address.module';
import { CommonServicesModule } from './features/common/services/common-services.module';
import { ConfigurationModule } from './features/configuration/configuration.module';
import { AnalyticsModule } from './features/analytics/analytics.module';
import { AuthModule } from './features/auth/auth.module';
import { UsersModule } from './features/users/users.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ControlsModule,
    AddressModule,
    LandingModule,
    ConfigurationModule,
    AnalyticsModule,
    AuthModule,
    UsersModule,

    CommonServicesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
