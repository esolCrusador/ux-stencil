import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItemModel } from '../models/cart-item.model';
import { CartModel } from '../models/cart.model';
import { ICart } from '../models/i-cart';
import { map } from 'rxjs/operators';
import { Gallery } from '@ux-stencil/images-gallery/gallery';
import { GalleryImage } from '@ux-stencil/images-gallery/gallery-image.enum';

@Injectable({ providedIn: 'root' })
export class CartService {
    private readonly cart$: BehaviorSubject<CartModel>;

    constructor() {
        const cartFromStorage: ICart = JSON.parse(localStorage.getItem('cart'));
        const cart = cartFromStorage ?? {
            items: [new CartItemModel({
                id: 1,
                image: Gallery[GalleryImage.StencilItem],
                name: 'UX Stencil',
                quantity: 1,
                cost: 29.99,
                currency: '$'
            })]
        };

        this.cart$ = new BehaviorSubject<CartModel>(new CartModel(cart));
    }

    public getCart$(): Observable<CartModel> {
        return this.cart$.pipe(
            map(c => new CartModel(c))
        );
    }

    public updateCart(cart: CartModel): void {
        localStorage.setItem('cart', JSON.stringify(cart));
        this.cart$.next(cart);
    }
}