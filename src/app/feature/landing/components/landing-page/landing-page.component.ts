import { Component, OnInit } from '@angular/core';
import { IMenuItemModel } from 'src/app/feature/controls/menu/i-menu-item.model';
import { MenuProvider } from 'src/app/feature/controls/services/menu.provider';
import { LandingMenu } from '../../models/landing-menu.enum';
import { IContactsModel } from '../../models/i-contacts.model';
import { IAnalyticsService } from 'src/app/feature/analytics/i-analytics.service';
import { Gallery } from 'src/app/feature/images-gallery/gallery';
import { GalleryImage } from 'src/app/feature/images-gallery/gallery-image.enum';
import { SeoService } from 'src/app/feature/common/services/seo.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing-page.component.html'
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
        private readonly seoService: SeoService,
    ) {
        const menuItems: IMenuItemModel[] = Object.keys(this.menu)
            .reduce((agg, itemId: keyof typeof LandingMenu) => {
                agg.push({ id: LandingMenu[itemId], title: this.menu[itemId] });
                return agg;
            }, [] as IMenuItemModel[]);
        this.menuProvider.setMenu(menuItems);
    }

    public ngOnInit(): void {
        this.analyticsService.trackPageView('Landing');
        this.setupSeo();
    }

    private setupSeo() {
        this.seoService.update(
            'UX/UI Stencil', 
            'Stencils for UX sketching on paper. A steel stencil designed for sketching iPhone prototypes. Brainstorm your application ideas and share them in no time.', 
            Gallery[GalleryImage.MainPhoto].url,
            Gallery[GalleryImage.MainBackground].url
        );
    }
}
