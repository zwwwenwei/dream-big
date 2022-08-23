import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StarControlComponent } from './Components/StarControl/star-control.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';

const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'star', component: StarControlComponent },
  { path: 'admin', loadChildren: adminModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
