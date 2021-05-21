import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./components/cart/cart.component";
import { PurchaseComponent } from './components/purchase/purchase.component';
import { ShippingComponent } from "./components/shipping/shipping.component";

const routes: Routes = [
    {
        path: '',
        component: PurchaseComponent,
        children: [
            { path: 'cart', component: CartComponent },
            { path: 'shipping', component: ShippingComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PurchaseRoutingModule {
}