import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasComponent } from './admin/canvas.component';
import { CategoryComponent } from './admin/category.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';

const unitsModule = () => import('./admin/units/units.module').then(x => x.UnitsModule);


const routes: Routes = [
  {path:'', component: LandingPageComponent},
  {path:'categorys', component: CategoryComponent},
  {path:'users', component: UserListComponent},
  {path:'star', component: CanvasComponent },
  {path:'units', loadChildren: unitsModule}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
