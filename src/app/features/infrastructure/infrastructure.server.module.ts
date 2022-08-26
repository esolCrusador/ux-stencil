import { NgModule } from '@angular/core';
import { HttpServerService } from './http/http.server.service';
import { CookieService } from './cookies/cookie.service';
import { CookieServerService } from './cookies/cookie.server.service';
import { LoggingServerModule } from '../logging/logging.server.module';
import { BrowserInfoService } from './browser-info/browser-info.service';
import { BrowserInfoServerService } from './browser-info/browser-info.server.service';
import { HttpService } from './http/http.service';

@NgModule({
  imports: [
    LoggingServerModule,
  ],
  providers: [
    { provide: CookieService, useClass: CookieServerService },
    { provide: HttpService, useClass: HttpServerService },
    { provide: BrowserInfoService, useClass: BrowserInfoServerService },
  ]
})
export class InfrastructureServerModule {

}
