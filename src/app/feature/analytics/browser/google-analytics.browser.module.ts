import { NgModule } from "@angular/core";
import { ANALYTICS_TOOL } from "../i-analytics.service";
import { GoogleAnalyticsService } from "./google-analytics.service";

@NgModule({
    providers: [
        { provide: ANALYTICS_TOOL, useClass: GoogleAnalyticsService, multi: true }
    ]
})
export class GoogleAnalyticsBrowserModule {
}