import { APP_BASE_HREF } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { SeoSocialShareService, JsonLdService } from 'ngx-seo';

@Injectable()
export class SeoService {
    private readonly host: string;
    constructor(
        private readonly seoSocialShareService: SeoSocialShareService,
        private readonly jsonLdService: JsonLdService,
        @Inject(APP_BASE_HREF) baseUrl: string
    ) {
        this.host = baseUrl;
    }

    public update(title: string, description: string, image: string): void {
        image = `${this.host}/${image}`;
        this.seoSocialShareService.setTitle(title);
        this.seoSocialShareService.setDescription(description);
        this.seoSocialShareService.setImage(image);
        this.seoSocialShareService.setTwitterCard('summary');

        const product = this.jsonLdService.getObject('Product', {
            name: title,
            description: description,
            image: image, audience: this.jsonLdService.getObject('Audience',
                { name: 'UX/UI Designers, Developers' }
            )
        });
        this.jsonLdService.setData(product)
    }
}