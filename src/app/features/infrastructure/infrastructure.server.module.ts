import { NgModule } from '@angular/core';
import { HttpService } from './http/http.service';
import { HttpServerService } from './http/http.server.service';
import { CookieService } from './cookies/cookie.service';
import { CookieServerService } from './cookies/cookie.server.service';
import { ILogger } from '../logging/i-logger';
import { LoggingServerModule } from '../logging/logging.server.module';
import { INavigationRejectService } from './navigation-rejection/i-navigation-reject.service';
import { NavigationRejectServerService } from './navigation-rejection/navigation-reject.server.service';
import { BrowserInfoService } from './browser-info/browser-info.service';
import { BrowserInfoServerService } from './browser-info/browser-info.server.service';

@NgModule({
  imports: [
    LoggingServerModule,
  ],
  providers: [
    { provide: CookieService, useClass: CookieServerService },
    { provide: HttpService, useClass: HttpServerService },
    { provide: INavigationRejectService, useClass: NavigationRejectServerService },
    { provide: BrowserInfoService, useClass: BrowserInfoServerService },
  ]
})
export class InfrastructureServerModule {

}
