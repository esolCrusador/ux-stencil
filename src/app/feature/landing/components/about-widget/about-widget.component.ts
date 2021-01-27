import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ContactType } from 'src/app/feature/controls/contact-link/contact.pipe';
import { ScrollService } from '../../services/scroll.service';

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
    @Input() public orderId: string;

    constructor(
        private readonly scrollService: ScrollService,
    ) {
    }

    public orderStencil() {
        this.scrollService.scrollById(this.orderId);
    }
}
