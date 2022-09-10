import { NgModule } from '@angular/core';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { StudentsRoutingModule } from './students-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { TableComponentModule } from '../generic/table.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        StudentsRoutingModule,
        RouterModule,
        TableComponentModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent
    ]
})
export class StudentModule { }