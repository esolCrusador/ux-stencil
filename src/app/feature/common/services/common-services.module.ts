import { NgModule } from '@angular/core';
import { WindowEventsService } from './window-events.service';
import { ScriptLoaderService } from './script-loader.service';

@NgModule({
    providers: [
        WindowEventsService,
        ScriptLoaderService,
    ]
})
export class CommonServicesModule {

}
