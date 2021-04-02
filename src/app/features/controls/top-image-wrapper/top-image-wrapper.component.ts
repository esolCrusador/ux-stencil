import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IImageModel } from '../../images-gallery/models/i-image.model';

@Component({
    selector: 'my-top-image-wrapper',
    templateUrl: './top-image-wrapper.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopImageWrapperComponent {
    private activeImage: IImageModel;
    @Input('image') public set setImage(value: IImageModel) {
        this.images.push(value);
        if (!this.activeImage)
            this.activeImage = value;
        else
            Promise.resolve().then(() => {
                this.images.splice(0, 1);
                this.activeImage = value;
                this.changeDetector.markForCheck();
            });
    }

    public images: IImageModel[] = [];

    public isActive(image: IImageModel): boolean {
        return image === this.activeImage;
    }

    constructor(
        private readonly changeDetector: ChangeDetectorRef,
    ) {

    }
}
