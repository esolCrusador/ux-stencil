import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteInstructionsComponent } from './components/delete-instructions/delete-instructions.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

const routes: Routes = [
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'delete-instructions', component: DeleteInstructionsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LegalRoutingModule {
}
