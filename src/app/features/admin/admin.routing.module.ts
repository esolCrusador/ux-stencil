import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMailComponent } from './components/admin-mail.component';

const routes: Routes = [
    { path: 'mail', component: AdminMailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}