import { NgModule } from '@angular/core';
import { HostingEnvironmentResolver } from './hosting-environment.resolver';
import { ConfigurationService } from './configuration.service';
import { ConfigurationApiClient } from './configuration.api-client';

@NgModule({
    providers: [
        HostingEnvironmentResolver,
        ConfigurationService,
        ConfigurationApiClient,
    ]
})
export class ConfigurationModule {

}
