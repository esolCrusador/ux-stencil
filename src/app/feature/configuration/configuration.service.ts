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
                return '259963757';
            default:
                return '259963757'; //TODO Remove
        }
    }
}
