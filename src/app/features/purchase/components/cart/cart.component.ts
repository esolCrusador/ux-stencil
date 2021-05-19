import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CartModel } from "../../models/cart.model";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
    public cart$: Observable<CartModel>;

    constructor(
        private readonly cartService: CartService
    ) {
    }
    
    public ngOnInit(): void {
        this.cart$ = this.cartService.getCart$().pipe(first());
    }
}