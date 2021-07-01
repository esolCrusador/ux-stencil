import { CartComponent } from './components/cart/cart.component';
import { NgModule } from '@angular/core';
import { PurchaseRoutingModule } from './purchase.routing.module';
import { ControlsModule } from '@ux-stencil/controls/controls.module';
import { RouterModule } from '@angular/router';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { AddressModule } from '@ux-stencil/address/address.module';

@NgModule({
    imports: [
        ControlsModule,
        RouterModule,
        PurchaseRoutingModule,
        AddressModule,
    ],
    declarations: [
        PurchaseComponent,
        CartComponent,
        ShippingComponent,
    ]
})
export class PurchaseModule {
}
