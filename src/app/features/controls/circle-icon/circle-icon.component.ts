import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'my-circle-icon',
    templateUrl: './circle-icon.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircleIconComponent {
    @Input() public iconClass: string;
    @Input() public inverse: boolean = false;
}
