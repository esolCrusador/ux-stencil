import { NgModule } from "@angular/core";
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { DeleteInstructionsComponent } from './components/delete-instructions/delete-instructions.component';
import { LegalRoutingModule } from './legal.routing.module';

@NgModule({
    imports: [ LegalRoutingModule ],
    declarations: [ 
        PrivacyPolicyComponent ,
        DeleteInstructionsComponent,
    ],
})
export class LegalModule {
}