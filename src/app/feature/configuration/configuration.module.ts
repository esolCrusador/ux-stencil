import { NgModule } from "@angular/core";
import { HostingEnvironmentResolver } from "./hosting-environment.resolver";
import { ConfigurationService } from './configuration.service';

@NgModule({
    providers: [
        HostingEnvironmentResolver,
        ConfigurationService,
    ]
})
export class ConfigurationModule {

}