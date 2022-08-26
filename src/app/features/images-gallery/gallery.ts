import { GalleryImage } from './gallery-image.enum';
import { IImageModel } from './models/i-image.model';

type GalleryImagesMap = { [key in keyof typeof GalleryImage]: IImageModel };
type GalleryImages = { [key in GalleryImage]: IImageModel };

const galleryImagesMap: GalleryImagesMap = {
    MainPhoto: { url: 'main-photo.jpg', description: 'UX/UI Stencil photo' },
    MainBackground: { url: 'main-background.jpg', description: 'UX/UI Stencil photo' },
    DrawingSample: { url: 'drawing-sample.jpg', description: 'UX/UI Stencil drawing sample' },
    DrawnPrototype: { url: 'drawn-prototypes.jpg', description: 'UX/UI Stencil drawn prototypes' },
    StencilOnTable: { url: 'stencil-on-table.jpg', description: 'UX/UI Stencil on a table' },
    StencilItem: { url: 'new-stencil.jpg', description: 'UX/UI Stencil item presentation' },
    StencilOnBench: { url: 'stencil-on-bench.jpg', description: 'UX/UI Stencil on a banch' },
    PrototypeNotebook: { url: 'prototypes-notebook.jpg', description: 'Notebook and tools' },
    OrderStencil: { url: 'order-stencil.jpg', description: 'UX/UI Stencil' }
};

const keys = Object.keys(galleryImagesMap) as Array<keyof typeof GalleryImage>;
export const Gallery: GalleryImages = keys
    .reduce((agg, photo) => {
        const image = galleryImagesMap[photo];
        image.url = 'assets/images/gallery/' + image.url;

        agg[GalleryImage[photo]] = galleryImagesMap[photo];
        return agg;
    }, {} as GalleryImages);
