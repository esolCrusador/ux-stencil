import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RepeaterComponent } from './repeater/repeater.component';
import { CircleIconComponent } from './circle-icon/circle-icon.component';
import { PhotoSliderComponent } from './photos-slider/photo-slider.component';
import { ContactLinkPipe } from './contact-link/contact.pipe';
import { BypassDomSecurityPipe } from './bypass-dom-security/bypass-dom-security.pipe';
import { ContactLinkComponent } from './contact-link/contact-link.component';
import { MenuComponent } from './menu/menu.component';
import { MenuProvider } from './services/menu.provider';
import { ScrollService } from './services/scroll.service';
import { BackToTopComponent } from './back-to-top/back-to-top.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        RepeaterComponent,
        CircleIconComponent,
        PhotoSliderComponent,
        ContactLinkComponent,
        MenuComponent,
        BackToTopComponent,

        ContactLinkPipe,
        BypassDomSecurityPipe,
    ],
    exports: [
        RepeaterComponent,
        CircleIconComponent,
        PhotoSliderComponent,
        ContactLinkComponent,
        MenuComponent,
        BackToTopComponent,

        ContactLinkPipe,
        BypassDomSecurityPipe,
    ],
    providers: [
        MenuProvider,
        ScrollService,
    ]
})
export class ControlsModule {
}
