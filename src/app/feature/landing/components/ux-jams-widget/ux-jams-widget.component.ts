import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ContactType } from '../../../controls/contact-link/contact.pipe';
import { IContactsModel } from '../../models/i-contacts.model';


@Component({
    selector: 'my-ux-jams-widget',
    templateUrl: './ux-jams-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UxJamsWidgetComponent {
    public ContactType = ContactType;

    @Input() public contacts: IContactsModel;
}
