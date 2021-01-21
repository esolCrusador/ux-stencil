import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ContactType } from 'src/app/feature/controls/contact-link/contact.pipe';

@Component({
    selector: 'my-about-widget',
    templateUrl: './about-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutWidgetComponent {
    public ContactType = ContactType;

    public galleryPhotos = ['stencil-on-bench.png', 'drawn-prototypes.png', 'prototypes-notebook.png'].map(photoName => `assets/images/gallery/${photoName}`);

    @Input() public cost: string = '29.99$';
    @Input() public telegram: string;
}
