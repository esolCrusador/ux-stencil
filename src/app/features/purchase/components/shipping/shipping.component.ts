import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CartModel } from "../../models/cart.model";
import { CartItemModel } from "../../models/cart-item.model";
import { Observable } from "rxjs";
import { CartService } from "../../services/cart.service";
import { first } from "rxjs/operators";

@Component({
    selector: 'app-shipping',
    templateUrl: './shipping.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingComponent implements OnInit {
    public cart$: Observable<CartModel>;

    constructor(
        private readonly cartService: CartService,
    ) {
    }

    public ngOnInit(): void {
        this.cart$ = this.cartService.getCart$().pipe(first());
    }

    public trackCartItem(index: number, item: CartItemModel) {
        return item.id;
    }
}