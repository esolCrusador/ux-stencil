import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'my-photo-slider',
    templateUrl: './photo-slider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoSliderComponent {
    private currentIndex: number = 0;
    private _photos: string[];

    @Input() public set photos(value: string[]) {
        this._photos = value;
        this.currentIndex = 0;
    }
    public get photos() {
        if (!this._photos)
            throw new Error('Photos must be initialized');

        return this._photos;
    }

    public get currentImage(): string {
        return this.photos[this.currentIndex];
    }

    public previous(): void {
        this.currentIndex--;
        this.handleIndexBounds();
    }

    public next(): void {
        this.currentIndex++;
        this.handleIndexBounds();
    }

    private handleIndexBounds(): void {
        const photosLength = this.photos.length;
        if (this.currentIndex >= 0 && this.currentIndex < photosLength)
            return;

        this.currentIndex = (this.currentIndex + photosLength) % photosLength;
    }
}
