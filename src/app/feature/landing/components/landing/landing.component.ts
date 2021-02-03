import { Component, OnInit } from '@angular/core';
import { IMenuItemModel } from 'src/app/feature/controls/menu/i-menu-item.model';
import { MenuProvider } from 'src/app/feature/controls/services/menu.provider';
import { LandingMenu } from '../../models/landing-menu.enum';
import { IContactsModel } from '../../models/i-contacts.model';
import { IAnalyticsService } from 'src/app/feature/analytics/i-analytics.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit {
    public LandingMenu = LandingMenu;

    public contacts: IContactsModel = {
        instagramLabel: 'UX_Stencil',
        instagram: 'ux_stencil',
        telegram: 'veronica_sotskaya',
        mail: 'veronica.sotskaya@gmail.com',
        uxJamsGroupLabel: 'UX Design Jams',
        uxJamsGroup: 'designers_meetups'
    };

    private readonly menu: { [itemId in keyof typeof LandingMenu]: string } = {
        Product: 'Product',
        Advantages: 'Advantages',
        UxJams: 'UX jam events',
        Order: 'Order'
    };

    constructor(
        private readonly menuProvider: MenuProvider,
        private readonly analyticsService: IAnalyticsService,
    ) {
        const menuItems: IMenuItemModel[] = Object.keys(this.menu)
            .reduce((agg, itemId: keyof typeof LandingMenu) => {
                agg.push({ id: LandingMenu[itemId], title: this.menu[itemId] });
                return agg;
            }, [] as IMenuItemModel[]);
        this.menuProvider.setMenu(menuItems);
    }

    public ngOnInit(): void {
        this.analyticsService.trackPageView('Landing', '/');
    }
}
