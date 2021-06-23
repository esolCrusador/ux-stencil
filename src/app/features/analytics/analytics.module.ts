import { NgModule } from '@angular/core';
import { IAnalyticsService } from './i-analytics.service';
import { AggregatedAnalyticsService } from './aggregated-analytics.service';

@NgModule({
    providers: [
        { provide: IAnalyticsService, useClass: AggregatedAnalyticsService }
    ]
})
export class AnalyticsModule {

}
