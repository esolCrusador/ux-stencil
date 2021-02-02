import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { IImageModel } from '../../images-gallery/models/i-image.model';

@Component({
    selector: 'my-photo-slider',
    templateUrl: './photo-slider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoSliderComponent {
    private _photos: IImageModel[];

    public currentIndex: number = 0;
    public previousDelegate = this.previous.bind(this);
    public nextDelegate = this.next.bind(this);
    public selectIndexDelegate = this.selectIndex.bind(this);

    @Input() public set photos(value: IImageModel[]) {
        this._photos = value;
        this.currentIndex = 0;
    }
    public get photos() {
        if (!this._photos)
            throw new Error('Photos must be initialized');

        return this._photos;
    }

    @Input() public controlsBottom: boolean = false;

    @ContentChild('itemTemplate', { static: false })
    public itemTemplate: TemplateRef<{ item: IImageModel }>;
    @ContentChild('itemControlsTemplate', { static: false })
    public itemControlsTemplate: TemplateRef<{ previous: () => void, next: () => void, index: number }>;

    public get currentImage(): IImageModel {
        return this.photos[this.currentIndex];
    }

    constructor(
    ) {

    }

    public previous(): void {
        this.changeIndex(index => index - 1);
    }

    public next(): void {
        this.changeIndex(index => index + 1);
    }

    public selectIndex(index: number): void {
        this.changeIndex(() => index);
    }

    private changeIndex(change: (index: number) => number): void {
        this.currentIndex = this.handleIndexBounds(change(this.currentIndex));
    }

    private handleIndexBounds(index: number): number {
        const photosLength = this.photos.length;
        if (index >= 0 && index < photosLength)
            return index;

        return (index + photosLength) % photosLength;
    }
}
