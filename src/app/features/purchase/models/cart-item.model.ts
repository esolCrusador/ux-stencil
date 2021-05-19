import { ICartItem } from "./i-cart-item";

export class CartItemModel implements ICartItem {
    public readonly id: number;
    public readonly name: string;
    public readonly quantity: number;
    public readonly cost: number;
    public readonly currency: string;

    constructor(cartItem: ICartItem) {
        this.id = cartItem.id;
        this.name = cartItem.name;
        this.quantity = cartItem.quantity;
        this.cost = cartItem.cost;
        this.currency = cartItem.currency;
    }

    public toCartItem(): ICartItem {
        return this;
    }
}