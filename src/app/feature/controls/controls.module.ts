import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RepeaterComponent } from "./repeater/repeater.component";
import { ContactIconComponent } from './contact-icon/contact-icon.component';
import { PhotoSliderComponent } from './photos-slider/photo-slider.component';
import { ContactLinkPipe } from './contact-link/contact.pipe';
import { BypassDomSecurityPipe } from './bypass-dom-security/bypass-dom-security.pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        RepeaterComponent,
        ContactIconComponent,
        PhotoSliderComponent,

        ContactLinkPipe,
        BypassDomSecurityPipe,
    ],
    exports: [
        RepeaterComponent,
        ContactIconComponent,
        PhotoSliderComponent,

        ContactLinkPipe,
        BypassDomSecurityPipe,
    ]
})
export class ControlsModule {
}