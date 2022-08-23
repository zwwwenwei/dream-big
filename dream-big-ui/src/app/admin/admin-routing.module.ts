import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const unitsModule = () => import('./units/units.module').then(x => x.UnitsModule);
const categoriesModule = () => import('./category/categories.module').then(x => x.CategoryModule);
const usersModule = () => import('./users/users.module').then(x => x.UserModule);



const routes: Routes = [
    {
        path: '', component: AdminComponent,
        children: [
            { path: 'units', loadChildren: unitsModule },
            { path: 'categories', loadChildren: categoriesModule },
            { path: 'users', loadChildren: usersModule }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }