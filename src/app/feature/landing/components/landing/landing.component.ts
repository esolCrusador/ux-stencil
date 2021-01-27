import { Component } from '@angular/core';
import { Scroll } from '@angular/router';
import { ContactType } from 'src/app/feature/controls/contact-link/contact.pipe';
import { ScrollService } from '../../services/scroll.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html'
})
export class LandingComponent {
    public ContactType = ContactType;

    public instagramLabel = 'UX_Stencil';
    public instagram = 'ux_stencil';

    public telegram = 'veronica_sotskaya';
    public mail = 'veronica.sotskaya@gmail.com';

    public uxJamsGroupLabel = 'UX Design Jams';
    public uxJamsGroup = 'designers_meetups';

    public orderId = 'order-form';

    constructor(
        private readonly scrollService: ScrollService,
    ) {
    }

    public orderStencil() {
        this.scrollService.scrollById(this.orderId);
    }
}
