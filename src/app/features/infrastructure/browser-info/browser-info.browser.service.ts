import { BrowserInfoService } from './browser-info.service';
import { Injectable } from '@angular/core';
import { ILogger } from '@ux-stencil/logging/i-logger';

@Injectable()
export class BrowserInfoBrowserService extends BrowserInfoService {
    constructor(logger: ILogger) {
        super(logger);
    }

    public getLanguages(): readonly string[] {
        return navigator.languages;
    }

    protected getUserAgent(): string {
        return navigator.userAgent;
    }
}
