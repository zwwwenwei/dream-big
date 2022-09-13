import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StarControlComponent } from './Components/StarControl/star-control.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { AvatarBuilderComponent } from './Components/avatar-builder/avatar-builder.component';

import { IntroPageComponent } from './Components/intro-page/intro-page.component';

const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'intro', component: IntroPageComponent},
  { path: 'star', component: StarControlComponent },
  { path: 'avatar-builder', component: AvatarBuilderComponent },
  { path: 'admin', loadChildren: adminModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
