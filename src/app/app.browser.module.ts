import { BrowserTransferStateModule, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import * as Hammer from 'hammerjs';
import { HammerGestureConfig } from '@angular/platform-browser';
import { AppModule } from './app.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleAnalyticsBrowserModule } from './features/analytics/browser/google-analytics.browser.module';
import { InfrastructureBroswerModule } from './features/infrastructure/infrastructure.browser.module';
import { LoggingBrowserModule } from './features/logging/logging.browser.module';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  public overrides = {
    swipe: { direction: Hammer.DIRECTION_HORIZONTAL },
    pinch: { enable: false },
    rotate: { enable: false },
    pan: { enable: false }
  };
}

@NgModule({
  imports: [
    AppModule,
    HammerModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,

    InfrastructureBroswerModule,
    LoggingBrowserModule,

    GoogleAnalyticsBrowserModule,
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
