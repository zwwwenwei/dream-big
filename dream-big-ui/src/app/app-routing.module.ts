import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StarControlComponent } from './Components/StarControl/star-control.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { AvatarBuilderComponent } from './Components/avatar-builder/avatar-builder.component';

import { IntroPageComponent } from './Components/intro-page/intro-page.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { StarMapComponent } from './Components/StarMap/star-map.component';
import { AuthGuard } from './services/authguard.service';
import { StarSystemComponent } from './Components/StarSystem/star-system.component';
import { HomeComponent } from './Components/home/home.component';

const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'intro', component: IntroPageComponent},
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'home', component: HomeComponent }, 
  { path: 'star', component: StarControlComponent },
  { path: 'avatar-builder', canActivate: [AuthGuard], component: AvatarBuilderComponent },
  { path: 'admin', canActivate: [AuthGuard], loadChildren: adminModule },
  { path: 'star-map', component: StarMapComponent },
  { path: 'star-system', component: StarSystemComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
