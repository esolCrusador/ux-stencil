import { ICartItem } from "./i-cart-item";

export interface ICart {
    items: ICartItem[];
    currency: string;
}