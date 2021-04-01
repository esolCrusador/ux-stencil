import { NgModule } from '@angular/core';
import { WindowEventsService } from './window-events.service';
import { ScriptLoaderService } from './script-loader.service';
import { SeoService } from './seo.service';
import { JsonLdModule } from 'ngx-seo';

@NgModule({
    imports: [
        JsonLdModule
    ],
    providers: [
        WindowEventsService,
        ScriptLoaderService,
        SeoService,
    ]
})
export class CommonServicesModule {

}
