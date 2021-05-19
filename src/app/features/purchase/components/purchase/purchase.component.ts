import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CartService } from "@ux-stencil/purchase/services/cart.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { sumFunction } from '@ux-stencil/common/helpers/array.helper';

@Component({
    selector: 'app-purchase',
    templateUrl: './purchase.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseComponent implements OnInit {
    public itemsCount$: Observable<number>;

    constructor(
        private readonly cartService: CartService,
    ) {
    }
    
    public ngOnInit(): void {
        this.itemsCount$ = this.cartService.getCart$().pipe(map(cart => sumFunction(cart.items, items => items.quantity)));
    }
}