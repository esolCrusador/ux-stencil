import { Component, OnInit } from '@angular/core';
import { IMenuItemModel } from '@ux-stencil/controls/menu/i-menu-item.model';
import { MenuProvider } from '@ux-stencil/controls/services/menu.provider';
import { LandingMenu } from '../../models/landing-menu.enum';
import { IContactsModel } from '../../models/i-contacts.model';
import { IAnalyticsService } from '@ux-stencil/analytics/i-analytics.service';
import { Gallery } from '@ux-stencil/images-gallery/gallery';
import { GalleryImage } from '@ux-stencil/images-gallery/gallery-image.enum';
import { SeoService } from '@ux-stencil/common/services/seo.service';

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

    constructor(
        private readonly menuProvider: MenuProvider,
        private readonly analyticsService: IAnalyticsService,
        private readonly seoService: SeoService,
    ) {
        this.menuProvider.initalize();
    }

    public ngOnInit(): void {
        this.analyticsService.trackPageView('Landing');
        this.setupSeo();
    }

    private setupSeo() {
        this.seoService.update(
            'UX/UI Stencil', 
            'Stencils for UX sketching on paper. A steel stencil designed for sketching iPone prototypes. Brainstorm your application ideas and share them in no time.', 
            Gallery[GalleryImage.MainPhoto].url,
            Gallery[GalleryImage.MainBackground].url
        );
    }
}
