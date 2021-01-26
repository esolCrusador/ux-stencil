import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingModule } from './feature/landing/landing.module';
import { ControlsModule } from './feature/controls/controls.module';
import { CommonServicesModule } from './feature/common/services/common-services.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ControlsModule,
    LandingModule,

    CommonServicesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
