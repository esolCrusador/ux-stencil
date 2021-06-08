import { NgModule } from '@angular/core';
import { HttpService } from './http/http.service';
import { HttpBrowserService } from './http/http.browser.service';
import { CookieService } from './cookies/cookie.service';
import { CookieBrowserService } from './cookies/cookie.browser.service';
import { LoggingBrowserModule } from '../logging/logging.browser.module';
import { BrowserInfoService } from './browser-info/browser-info.service';
import { BrowserInfoBrowserService } from './browser-info/browser-info.browser.service';

@NgModule({
  imports: [
    LoggingBrowserModule,
  ],
  providers: [
    { provide: CookieService, useClass: CookieBrowserService },
    { provide: HttpService, useClass: HttpBrowserService },
    { provide: BrowserInfoService, useClass: BrowserInfoBrowserService },
  ],
})
export class InfrastructureBroswerModule {

}
