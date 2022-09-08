import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { CategoryRoutingModule } from './categories-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { TableComponentModule } from '../generic/table.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CategoryRoutingModule,
        RouterModule,
        TableComponentModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent
    ]
})
export class CategoryModule { }