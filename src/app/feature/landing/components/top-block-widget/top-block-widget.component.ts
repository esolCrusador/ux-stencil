import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ContactType } from "src/app/feature/controls/contact-link/contact.pipe";
import { ScrollService } from "src/app/feature/controls/services/scroll.service";
import { IContactsModel } from "../../models/i-contacts.model";
import { LandingMenu } from "../../models/landing-menu.enum";

@Component({
    selector: 'my-top-block-widget',
    templateUrl: './top-block-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBlockWidgetComponent {
    public ContactType = ContactType;

    @Input() public contacts: IContactsModel;

    public isMenuOpened: boolean = false;

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