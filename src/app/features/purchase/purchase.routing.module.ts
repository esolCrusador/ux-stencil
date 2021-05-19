import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./components/cart/cart.component";
import { PurchaseComponent } from './components/purchase/purchase.component';

const routes: Routes = [
    {
        path: '',
        component: PurchaseComponent,
        children: [
            { path: 'cart', component: CartComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PurchaseRoutingModule {
}