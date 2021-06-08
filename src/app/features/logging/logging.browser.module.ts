import { NgModule } from '@angular/core';
import { LoggingModule } from './logging.module';
import { LOGGER_KIND } from './i-logger';
import { ConsoleLogger } from './services/console.logger';

@NgModule({
    imports: [LoggingModule],
    providers: [
        { provide: LOGGER_KIND, useClass: ConsoleLogger, multi: true },
    ]
})
export class LoggingBrowserModule {
}
