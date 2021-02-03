import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { ScriptLoaderService } from "../../common/services/script-loader.service";
import { ConfigurationService } from "../../configuration/configuration.service";
import { IAnalyticsService } from "../i-analytics.service";

@Injectable()
export class GoogleAnalyticsService implements IAnalyticsService {
    private initialization: Promise<void>;

    constructor(
        private readonly scriptLoader: ScriptLoaderService,
        private readonly configurationService: ConfigurationService,
    ) {
    }

    public isEnabled(): boolean {
        return !!this.configurationService.googleAnalyticsId;
    }

    public initialize(): Promise<void> {
        if (!this.initialization)
            this.initialization = this.scriptLoader.loadScript('google-analytics', 'https://www.google-analytics.com/analytics.js').pipe(
                tap(() => ga.create(this.configurationService.googleAnalyticsId))
            ).toPromise();

        return this.initialization;
    }

    public async trackPageView(pageType: string, page: string): Promise<void> {
        await this.initialize();

        ga('send', 'pageview', page);
    }
}
