import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LandingMenu } from '../../models/landing-menu.enum';

@Component({
    selector: 'my-order-widget',
    templateUrl: './order-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderWidgetComponent implements OnInit {
    private formLoadedTimes = 0;
    public LandingMenu = LandingMenu;
    public inBrowser: boolean;

    constructor(
        @Inject(PLATFORM_ID) private readonly platformId: Object,
    ) {
    }

    public ngOnInit(): void {
        this.inBrowser = isPlatformBrowser(this.platformId);
    }

    public formLoaded(): void {
        this.formLoadedTimes++;
        if (this.formLoadedTimes === 2) {
            // Track preorder
        }
    }
}

