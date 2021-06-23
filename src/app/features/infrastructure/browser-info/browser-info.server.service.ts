import { Injectable, Inject } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { ILogger } from '@ux-stencil/logging/i-logger';
import { BrowserInfoService } from './browser-info.service';

@Injectable()
export class BrowserInfoServerService extends BrowserInfoService {
    private readonly browserData: { userAgent: string, languages: readonly string[] };

    constructor(
        @Inject(REQUEST) request: Request,
        logger: ILogger,
    ) {
        super(logger);
        this.browserData = {
            userAgent: request.headers.get('User-Agent'),
            languages: request.headers.get('Accept-Language').split(',')
        };
    }

    public getLanguages(): readonly string[] {
        return this.browserData.languages;
    }

    protected getUserAgent(): string {
        return this.browserData.userAgent;
    }
}
