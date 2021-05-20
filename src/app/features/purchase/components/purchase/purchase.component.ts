import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CartService } from "@ux-stencil/purchase/services/cart.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { sumFunction } from '@ux-stencil/common/helpers/array.helper';
import { MenuDirection } from "@ux-stencil/controls/menu/menu-direction.enum";
import { MenuProvider } from "@ux-stencil/controls/services/menu.provider";
import { WindowEventsService } from "@ux-stencil/common/services/window-events.service";

@Component({
    selector: 'app-purchase',
    templateUrl: './purchase.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseComponent implements OnInit {
    public itemsCount$: Observable<number>;
    public isMobile$: Observable<boolean>;

    public MenuDirection = MenuDirection;

    constructor(
        private readonly cartService: CartService,
        private readonly menuProvider: MenuProvider,
        private readonly windowEventsService: WindowEventsService,
    ) {
        this.menuProvider.initalize();
    }
    
    public ngOnInit(): void {
        this.itemsCount$ = this.cartService.getCart$().pipe(map(cart => sumFunction(cart.items, items => items.quantity)));
        this.isMobile$ = this.windowEventsService.windowSize$().pipe(map(size => size.width < 768 ));
    }
}