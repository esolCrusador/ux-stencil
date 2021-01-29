import { HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import * as Hammer from 'hammerjs';
import { HammerGestureConfig } from '@angular/platform-browser';
import { AppModule } from './app.module';

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
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
