import { IAnalyticsService, ANALYTICS_TOOL } from './i-analytics.service';
import { Inject, Injectable, Optional } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AggregatedAnalyticsService implements IAnalyticsService {
    private readonly analyticsTools;

    constructor(
        @Optional() @Inject(ANALYTICS_TOOL) analyticsTools: IAnalyticsService[],
        private readonly router: Router,
    ) {
        if (analyticsTools && analyticsTools.length > 0)
            analyticsTools = analyticsTools.filter(t => t.isEnabled());

        this.analyticsTools = analyticsTools && analyticsTools.length > 0 ? analyticsTools : null;
    }

    public isEnabled(): boolean {
        return !!this.analyticsTools;
    }

    public trackPageView(pageType: string, page?: string) {
        if (!this.analyticsTools || this.analyticsTools.length === 0)
            return;

        const url = page ?? this.router.url;
        for (const tool of this.analyticsTools)
            this.trackInTool(tool, pageType, url);
    }

    private trackInTool(analyticsTool: IAnalyticsService, pageType: string, page: string): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                analyticsTool.trackPageView(page, pageType);
                resolve();
            } catch (ex) {
                reject(ex);
            }
        });
    }
}
