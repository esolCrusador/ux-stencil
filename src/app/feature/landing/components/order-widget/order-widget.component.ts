import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LandingMenu } from '../../models/landing-menu.enum';

@Component({
    selector: 'my-order-widget',
    templateUrl: './order-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderWidgetComponent {
    public LandingMenu = LandingMenu;
}

