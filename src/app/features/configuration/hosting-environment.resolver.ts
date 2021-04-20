import { APP_BASE_HREF } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { HostingEnvironment } from './hosting-evnironment.enum';

@Injectable()
export class HostingEnvironmentResolver {
    private _host: string;
    private hostingEnvironment: HostingEnvironment;

    constructor(
        @Inject(APP_BASE_HREF) private readonly baseUrl: string,
    ) {
    }

    public get host(): string {
        if (!this._host)
            this._host = this.baseUrl;

        return this._host;
    }

    public getHostingEnvironment(): HostingEnvironment {
        if (!this.hostingEnvironment) {
            if (this.baseUrl.startsWith('https://ux-stencil.net'))
                this.hostingEnvironment = HostingEnvironment.Production;
            else
                this.hostingEnvironment = HostingEnvironment.Local;
        }

        return this.hostingEnvironment;
    }
}
