import { InjectionToken } from '@angular/core';

export const ANALYTICS_TOOL = new InjectionToken<IAnalyticsService>('AnalyticsTool');

export abstract class IAnalyticsService {
    public abstract isEnabled(): boolean;
    public abstract trackPageView(pageType: string, url?: string): void;
}
