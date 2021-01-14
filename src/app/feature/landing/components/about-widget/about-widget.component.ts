import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'my-about-widget',
    templateUrl: './about-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutWidgetComponent {
    public galleryPhotos = ['stencil-on-bench.png', 'drawn-prototypes.png', 'prototypes-notebook.png'].map(photoName => `assets/images/gallery/${photoName}`);
}