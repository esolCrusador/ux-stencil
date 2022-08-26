import { IImageModel } from '@ux-stencil/images-gallery/models/i-image.model';
import { ICartItem } from './i-cart-item';

export class CartItemModel implements ICartItem {
    private _quantity: number;

    public readonly itemId: number;
    public readonly image: IImageModel;
    public readonly name: string;
    public get quantity(): number {
        return this._quantity;
    }
    public readonly cost: number;

    constructor(cartItem: ICartItem) {
        this.itemId = cartItem.itemId;
        this.image = cartItem.image;
        this.name = cartItem.name;
        this._quantity = cartItem.quantity;
        this.cost = cartItem.cost;
    }

    public toCartItem(): ICartItem {
        return {
            itemId: this.itemId,
            image: this.image,
            name: this.name,
            quantity: this.quantity,
            cost: this.cost
        };
    }

    public updateQuantity(quanitity: number) {
        this._quantity = quanitity;
    }
}
