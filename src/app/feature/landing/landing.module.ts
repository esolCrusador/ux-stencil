import { NgModule } from "@angular/core";
import { LandingComponent } from "./components/landing/landing.component";
import { ControlsModule } from '../controls/controls.module';

@NgModule({
    imports: [ControlsModule],
    declarations: [LandingComponent],
    exports: [LandingComponent]
})
export class LandingModule {
}