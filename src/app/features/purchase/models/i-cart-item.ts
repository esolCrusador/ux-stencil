import { IImageModel } from '@ux-stencil/images-gallery/models/i-image.model';

export interface ICartItem {
    id: number;
    image: IImageModel;
    name: string;
    quantity: number;
    cost: number;
}