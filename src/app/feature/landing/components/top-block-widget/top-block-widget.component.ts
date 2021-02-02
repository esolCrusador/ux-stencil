import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ContactType } from 'src/app/feature/controls/contact-link/contact.pipe';
import { IImageModel } from 'src/app/feature/images-gallery/models/i-image.model';
import { ScrollService } from 'src/app/feature/controls/services/scroll.service';
import { IContactsModel } from '../../models/i-contacts.model';
import { LandingMenu } from '../../models/landing-menu.enum';
import { Gallery } from '../../../images-gallery/gallery';
import { GalleryImage } from 'src/app/feature/images-gallery/gallery-image.enum';

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
