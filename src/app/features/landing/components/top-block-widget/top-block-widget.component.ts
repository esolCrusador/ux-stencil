import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ContactType } from '@ux-stencil/controls/contact-link/contact.pipe';
import { IImageModel } from '@ux-stencil/images-gallery/models/i-image.model';
import { ScrollService } from '@ux-stencil/controls/services/scroll.service';
import { IContactsModel } from '../../models/i-contacts.model';
import { LandingMenu } from '../../models/landing-menu.enum';
import { Gallery } from '../../../images-gallery/gallery';
import { GalleryImage } from '@ux-stencil/images-gallery/gallery-image.enum';

@Component({
    selector: 'my-top-block-widget',
    templateUrl: './top-block-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBlockWidgetComponent {
    public ContactType = ContactType;

    @Input() public contacts: IContactsModel;

    public isMenuOpened: boolean = false;
    public images: IImageModel[] = [
        Gallery[GalleryImage.MainPhoto],
        Gallery[GalleryImage.DrawingSample]
    ];
    public background: IImageModel = Gallery[GalleryImage.MainBackground];

    constructor(
        private readonly scrollService: ScrollService,
    ) {
    }

    public orderStencil() {
        this.scrollService.scrollById(LandingMenu.Order);
    }

    public learnMore() {
        this.scrollService.scrollById(LandingMenu.Product);
    }

    public onMenuOpened(isOpened: boolean) {
        this.isMenuOpened = isOpened;
    }
}
