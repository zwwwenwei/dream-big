import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Unit } from './model/unit';
import { Category } from './model/category';

const routes: Routes = [
  {path:'admin/Unit', component: Unit },
  {path:'admin/category', component: Category}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
