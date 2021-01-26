import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ContactType } from "../../../controls/contact-link/contact.pipe";


@Component({
    selector: 'my-ux-jams-widget',
    templateUrl: './ux-jams-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UxJamsWidgetComponent {
    public ContactType = ContactType;

    @Input() public instagramLabel: string;
    @Input() public instagram: string;

    @Input() public uxJamsGroupLabel: string;
    @Input() public uxJamsGroup: string;
}