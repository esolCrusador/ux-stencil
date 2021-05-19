import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './features/landing/components/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(module => module.AdminModule) },
  { path: 'purchase', loadChildren: () => import('./features/purchase/purchase.module').then(module => module.PurchaseModule) },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
