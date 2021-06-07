import { NgModule } from "@angular/core";
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { LegalRoutingModule } from './legal.routing.module';

@NgModule({
    imports: [ LegalRoutingModule ],
    declarations: [ PrivacyPolicyComponent ],
})
export class LegalModule {
}