import { NgModule } from "@angular/core";
import { LandingComponent } from "./components/landing/landing.component";
import { ControlsModule } from '../controls/controls.module';
import { FeaturesWidgetComponent } from './components/features-widget/features-widget.component';

@NgModule({
    imports: [ControlsModule],
    declarations: [
        LandingComponent,
        
        FeaturesWidgetComponent,
    ],
    exports: [LandingComponent]
})
export class LandingModule {
}