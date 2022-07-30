import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitComponent } from './admin/unit.component';
import { CategoryComponent } from './admin/category.component';
import { UserListComponent } from './admin/user-list/user-list.component';

const routes: Routes = [
  {path:'units', component: UnitComponent },
  {path:'categorys', component: CategoryComponent},
  {path:'users', component: UserListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
