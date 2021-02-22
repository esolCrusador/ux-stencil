import { Injectable } from '@angular/core';
import { HostingEnvironmentResolver } from './hosting-environment.resolver';
import { HostingEnvironment } from './hosting-evnironment.enum';

@Injectable()
export class ConfigurationService {

    constructor(
        private readonly hostingEvnironmentResolver: HostingEnvironmentResolver,
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
}
