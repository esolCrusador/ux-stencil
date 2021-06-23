import { Injectable } from '@angular/core';
import { mapTo, tap } from 'rxjs/operators';
import { ScriptLoaderService } from '../../common/services/script-loader.service';
import { ConfigurationService } from '../../configuration/configuration.service';
import { IAnalyticsService } from '../i-analytics.service';

@Injectable()
export class GoogleAnalyticsService implements IAnalyticsService {
    private initialization: Promise<boolean>;

    constructor(
        private readonly scriptLoader: ScriptLoaderService,
        private readonly configurationService: ConfigurationService,
    ) {
    }

    public isEnabled(): boolean {
        return !!this.configurationService.googleAnalyticsId;
    }

    public initialize(): Promise<boolean> {
        const analyticsId = this.configurationService.googleAnalyticsId;

        if (!this.initialization)
            this.initialization = analyticsId
                ? this.scriptLoader.loadScript('google-analytics', 'https://www.google-analytics.com/analytics.js').pipe(
                    tap(() => ga.create(analyticsId)),
                    mapTo(true)
                ).toPromise()
                : Promise.resolve(false);

        return this.initialization;
    }

    public async trackPageView(pageType: string, page: string): Promise<void> {
        if (await this.initialize())
            ga('send', 'pageview', page);
    }
}
