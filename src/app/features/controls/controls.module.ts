import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RepeaterComponent } from './repeater/repeater.component';
import { CircleIconComponent } from './circle-icon/circle-icon.component';
import { PhotoSliderComponent } from './photos-slider/photo-slider.component';
import { NumericComponent } from './inputs/numeric/numeric.component';
import { ContactLinkPipe } from './contact-link/contact.pipe';
import { BypassDomSecurityPipe } from './bypass-dom-security/bypass-dom-security.pipe';
import { MoneyPipe } from './money/money.pipe';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectFilterModule } from 'mat-select-filter';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,

        A11yModule,

        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatSelectFilterModule,

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

        NumericComponent,

        ContactLinkPipe,
        BypassDomSecurityPipe,
        MoneyPipe,
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

        NumericComponent,

        ContactLinkPipe,
        BypassDomSecurityPipe,
        MoneyPipe,

        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatSelectFilterModule,

        MatMenuModule,
    ],
    providers: [
        MenuProvider,
        DecimalPipe,
        ScrollService,
    ]
})
export class ControlsModule {
}
