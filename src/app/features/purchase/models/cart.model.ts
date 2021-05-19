import { CartItemModel } from "./cart-item.model";
import { ICart } from "./i-cart";
import { ICartItem } from "./i-cart-item";

export class CartModel implements ICart {
    public items: CartItemModel[];

    constructor(cart: ICart) {
        this.items = cart.items.map(i => new CartItemModel(i));
    }

    public toCart(): ICart {
        return {
            items: this.items as ICartItem[]
        };
    }
}