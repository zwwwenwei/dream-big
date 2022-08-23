import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { StudentsRoutingModule } from './students-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { TableComponentModule } from '../generic/table.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        StudentsRoutingModule,
        RouterModule,
        TableComponentModule,
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent
    ]
})
export class StudentModule { }