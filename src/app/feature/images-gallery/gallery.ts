import { GalleryImage } from "./gallery-image.enum";
import { IImageModel } from './models/i-image.model';

type GalleryImagesMap = { [key in keyof typeof GalleryImage]: IImageModel };
type GalleryImages = { [key in GalleryImage]: IImageModel };

const galleryImagesMap: GalleryImagesMap = {
    MainPhoto: { url: 'main-photo.jpg', description: 'UX Stencil photo' },
    DrawingSample: { url: 'drawing-sample.jpg', description: 'UX Stencil drawing sample' },
    DrawnPrototype: { url: 'drawn-prototypes.jpg', description: 'UX Stencil drawn prototypes' },
    StencilOnTable: { url: 'stencil-on-table.jpg', description: 'UX Stencil on a table' },
    StencilOnBench: { url: 'stencil-on-bench.jpg', description: 'UX Stencil on a banch' },
    PrototypeNotebook: { url: 'prototypes-notebook.jpg', description: 'Notebook and tools' },
    OrderStencil: { url: 'order-stencil.jpg', description: 'UX Stencil' }
};

const keys = Object.keys(galleryImagesMap) as Array<keyof typeof GalleryImage>;
export const Gallery: GalleryImages = keys
    .reduce((agg, photo) => {
        const image = galleryImagesMap[photo];
        image.url = 'assets/images/gallery/' + image.url;

        agg[GalleryImage[photo]] = galleryImagesMap[photo];
        return agg;
    }, {} as GalleryImages);