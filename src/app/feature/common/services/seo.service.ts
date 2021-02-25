import { APP_BASE_HREF } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { SeoSocialShareService, JsonLdService } from 'ngx-seo';

@Injectable()
export class SeoService {
    private readonly host: string;
    constructor(
        private readonly seoSocialShareService: SeoSocialShareService,
        private readonly metaService: Meta,
        private readonly jsonLdService: JsonLdService,
        @Inject(APP_BASE_HREF) baseUrl: string
    ) {
        this.host = baseUrl;
    }

    public update(title: string, description: string, image: string, bigImage: string): void {
        image = `${this.host}/${image}`;
        bigImage = `${this.host}/${bigImage}`;

        this.seoSocialShareService.setTitle(title);
        this.seoSocialShareService.setDescription(description);
        this.seoSocialShareService.setImage(image);
        this.seoSocialShareService.setTwitterCard('summary');
        this.metaService.updateTag({ property: 'og:image', content: bigImage });

        const product = this.jsonLdService.getObject('Product', {
            name: title,
            description: description,
            sku: 'iphone-x-stencil',
            brand: 'UX Stencils',
            offers: this.jsonLdService.getObject('Offer', {
                price: '29.99',
                priceCurrency: 'USD',
                availability: 'http://schema.org/PreOrder'
            }),
            image: image, audience: this.jsonLdService.getObject('Audience',
                { name: 'UX/UI Designers, Developers' }
            )
        });
        this.jsonLdService.setData(product)
    }
}