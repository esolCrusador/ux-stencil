import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ContactType } from './contact.pipe';

@Component({
    selector: 'my-contact-link',
    templateUrl: './contact-link.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactLinkComponent {
    @Input() public contact: string;
    @Input() public contactType: ContactType;
}
