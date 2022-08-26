import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CartModel } from '../../models/cart.model';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { CartItemModel } from '@ux-stencil/purchase/models/cart-item.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
    public cart$: Observable<CartModel>;

    constructor(
        private readonly router: Router,
        private readonly cartService: CartService,
    ) {
    }

    public ngOnInit(): void {
        this.cart$ = this.cartService.getCart$().pipe(first());
    }

    public trackCartItem(index: number, item: CartItemModel) {
        return item.itemId;
    }

    public quantityChanged(cart: CartModel, item: CartItemModel, quantity: number) {
        cart.updateQuantity(item, quantity);

        this.cartService.updateCart(cart);
    }

    public remove(cart: CartModel, item: CartItemModel) {
        this.quantityChanged(cart, item, 0);
    }

    public confirmOrder(): void {
        this.router.navigate(['/', 'purchase', 'shipping']);
    }
}
