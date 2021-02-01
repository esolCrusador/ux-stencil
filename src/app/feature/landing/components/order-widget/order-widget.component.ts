import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LandingMenu } from '../../models/landing-menu.enum';

@Component({
    selector: 'my-order-widget',
    templateUrl: './order-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderWidgetComponent {
    private formLoadedTimes = 0;
    public LandingMenu = LandingMenu;

    public formLoaded(): void {
        this.formLoadedTimes++;
        if (this.formLoadedTimes === 2) { 
            // Track preorder
        }
    }
}

