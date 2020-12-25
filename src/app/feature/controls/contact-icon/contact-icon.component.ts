import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ContactType } from "../contact-link/contact.pipe";

@Component({
    selector: 'my-contact-icon',
    templateUrl: './contact-icon.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactIconComponent {
    @Input() public iconClass: string;
    @Input() public contact: string;
    @Input() public contactType: ContactType;
}