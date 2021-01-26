import { Component } from '@angular/core';
import { ContactType } from 'src/app/feature/controls/contact-link/contact.pipe';

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
}
