import { sumFunction } from "@ux-stencil/common/helpers/array.helper";
import { CartItemModel } from "./cart-item.model";
import { ICart } from "./i-cart";

export class CartModel implements ICart {
    private _total: number;

    public items: CartItemModel[];
    public currency: string;
    public get total(): number {
        return this._total;
    }

    constructor(cart: ICart) {
        this.items = cart.items.map(i => new CartItemModel(i));
        this.currency = cart.currency;
        this.calculateTotal();
    }

    public toCart(): ICart {
        return {
            items: this.items.map(i => i.toCartItem()),
            currency: this.currency,
        };
    }

    public updateQuantity(item: CartItemModel, quantity: number) {
        item.updateQuantity(quantity);
        this.calculateTotal();
    }

    private calculateTotal(): void {
        this._total = sumFunction(this.items, item => item.cost * item.quantity);
    }
}