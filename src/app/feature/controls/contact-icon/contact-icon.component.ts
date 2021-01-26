import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'my-contact-icon',
    templateUrl: './contact-icon.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactIconComponent {
    @Input() public iconClass: string;
}
