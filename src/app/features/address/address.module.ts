import { NgModule } from "@angular/core";
import { ControlsModule } from "@ux-stencil/controls/controls.module";
import { AddressService } from './services/address.service';
import { AddressApiClient } from './services/address.api-client';
import { AddressFormComponent } from "./components/address-form/address-form.component";
import { AddressSelectorComponent } from "./components/address-selector/address-selector.component";
import { AddressModalComponent } from './components/address-modal/address-modal.component'; 

@NgModule({
    imports: [
        ControlsModule,
    ],

    declarations: [
        AddressFormComponent,
        AddressModalComponent,
        AddressSelectorComponent,
    ],

    exports: [
        AddressSelectorComponent,
    ],

    providers: [
        AddressService,
        AddressApiClient,
    ]
})
export class AddressModule {

}