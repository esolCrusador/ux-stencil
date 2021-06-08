import { Injectable, Inject } from '@angular/core';
import { BrowserInfoService } from './browser-info.service';
import { REQUEST } from '@nguniversal/aspnetcore-engine/tokens';
import { IRequestParams } from '@nguniversal/aspnetcore-engine';
import { ILogger } from '@share-book/features/logging/i-logger';

@Injectable()
export class BrowserInfoServerService extends BrowserInfoService {
    private readonly browserData: { userAgent: string, languages: readonly string[] };

    constructor(
        @Inject(REQUEST) request: IRequestParams,
        logger: ILogger,
    ) {
        super(logger);
        this.browserData = request.data.browser;
    }

    public getLanguages(): readonly string[] {
        return this.browserData.languages;
    }

    protected getUserAgent(): string {
        return this.browserData.userAgent;
    }
}