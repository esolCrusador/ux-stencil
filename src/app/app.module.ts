import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingModule } from './feature/landing/landing.module';
import { ControlsModule } from './feature/controls/controls.module';
import { CommonServicesModule } from './feature/common/services/common-services.module';
import { ConfigurationModule } from './feature/configuration/configuration.module';
import { AnalyticsModule } from './feature/analytics/analytics.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ControlsModule,
    LandingModule,
    ConfigurationModule,
    AnalyticsModule,

    CommonServicesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
