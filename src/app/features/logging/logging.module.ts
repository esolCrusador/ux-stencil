import { NgModule, ErrorHandler } from '@angular/core';
import { ILogger } from './i-logger';
import { AggregatedLogger } from './services/aggregated.logger';
import { GlobalErrorHandler } from './services/global-error.handler';

@NgModule({
    providers: [
        { provide: ILogger, useClass: AggregatedLogger },
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
    ]
})
export class LoggingModule {
}
