import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ContactType } from 'src/app/feature/controls/contact-link/contact.pipe';
import { MenuDirection } from 'src/app/feature/controls/menu/menu-direction.enum';
import { IContactsModel } from '../../models/i-contacts.model';
import { LandingMenu } from '../../models/landing-menu.enum';

@Component({
    selector: 'my-footer-widget',
    templateUrl: './footer-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterWidgetComponent {
    public LandingMenu = LandingMenu;
    public MenuDirection = MenuDirection;
    public ContactType = ContactType;

    @Input() public contacts: IContactsModel;
}
