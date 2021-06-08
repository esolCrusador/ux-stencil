import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { ConfigurationApiClient } from './configuration.api-client';
import { HostingEnvironmentResolver } from './hosting-environment.resolver';
import { HostingEnvironment } from './hosting-evnironment.enum';
import { IFrontendConfiguration } from './models/i-frontnd-configuration';

@Injectable()
export class ConfigurationService {
    private frontendConfiguration$: Observable<IFrontendConfiguration>;

    constructor(
        private readonly hostingEvnironmentResolver: HostingEnvironmentResolver,
        private readonly configurationApiClient: ConfigurationApiClient,
    ) {
    }

    public get googleAnalyticsId(): string {
        switch (this.hostingEvnironmentResolver.getHostingEnvironment()) {
            case HostingEnvironment.Production:
                return 'UA-71204716-1';
            default:
                return null;
        }
    }

    public getFacebookClientId$(): Observable<string> {
        return this.getFrontendConfiguration().pipe(map(configuration => configuration.facebookClientId));
    }

    public getGoogleClientId$(): Observable<string> {
        return this.getFrontendConfiguration().pipe(map(configration => configration.googleClientId));
    }

    private getFrontendConfiguration(): Observable<IFrontendConfiguration> {
        if (!this.frontendConfiguration$)
            this.frontendConfiguration$ = this.configurationApiClient.getConfiguration().pipe(
                publishReplay(1),
                refCount()
            );

        return this.frontendConfiguration$;
    }
}
