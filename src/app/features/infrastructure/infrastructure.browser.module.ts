import { NgModule } from '@angular/core';
import { HttpService } from './http/http.service';
import { HttpBrowserService } from './http/http.browser.service';
import { CookieService } from './cookies/cookie.service';
import { CookieBrowserService } from './cookies/cookie.browser.service';
import { LoggingBrowserModule } from '../logging/logging.browser.module';
import { INavigationRejectService } from './navigation-rejection/i-navigation-reject.service';
import { NavigationRejectBrowserService } from './navigation-rejection/navigation-reject.browser.service';
import { BrowserInfoService } from './browser-info/browser-info.service';
import { BrowserInfoBrowserService } from './browser-info/browser-info.browser.service';

@NgModule({
  imports: [
    LoggingBrowserModule,
  ],
  providers: [
    { provide: CookieService, useClass: CookieBrowserService },
    { provide: HttpService, useClass: HttpBrowserService },
    { provide: INavigationRejectService, useClass: NavigationRejectBrowserService },
    { provide: BrowserInfoService, useClass: BrowserInfoBrowserService },
  ],
})
export class InfrastructureBroswerModule {

}
