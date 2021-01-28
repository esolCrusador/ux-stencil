import { NgModule } from '@angular/core';
import { LandingComponent } from './components/landing/landing.component';
import { ControlsModule } from '../controls/controls.module';
import { FeaturesWidgetComponent } from './components/features-widget/features-widget.component';
import { AboutWidgetComponent } from './components/about-widget/about-widget.component';
import { UxJamsWidgetComponent } from './components/ux-jams-widget/ux-jams-widget.component';
import { OrderWidgetComponent } from './components/order-widget/order-widget.component';
import { FooterWidgetComponent } from './components/footer-widget/footer-widget.component';

@NgModule({
    imports: [ControlsModule],
    declarations: [
        LandingComponent,

        FeaturesWidgetComponent,
        AboutWidgetComponent,
        UxJamsWidgetComponent,
        OrderWidgetComponent,
        FooterWidgetComponent,
    ],
    exports: [LandingComponent],
    providers: [
    ],
})
export class LandingModule {
}
