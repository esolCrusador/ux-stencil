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
import { MatMenuModule } from '@angular/material/menu';
import { A11yModule } from '@angular/cdk/a11y';
import { TopImageWrapperComponent } from './top-image-wrapper/top-image-wrapper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,

        A11yModule,

        MatMenuModule,
    ],
    declarations: [
        RepeaterComponent,
        CircleIconComponent,
        PhotoSliderComponent,
        ContactLinkComponent,
        MenuComponent,
        BackToTopComponent,
        TopImageWrapperComponent,

        ContactLinkPipe,
        BypassDomSecurityPipe,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        RepeaterComponent,
        CircleIconComponent,
        PhotoSliderComponent,
        ContactLinkComponent,
        MenuComponent,
        BackToTopComponent,
        TopImageWrapperComponent,

        ContactLinkPipe,
        BypassDomSecurityPipe,

        MatMenuModule,
    ],
    providers: [
        MenuProvider,
        ScrollService,
    ]
})
export class ControlsModule {
}
