import { IImageModel } from '@ux-stencil/images-gallery/models/i-image.model';

export interface ICartItem {
    itemId: number;
    image: IImageModel;
    name: string;
    quantity: number;
    cost: number;
}
