import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UnitService } from './services/unit.service';
import { CategoryService } from './services/category.service';

import { UnitComponent } from './admin/unit.component';
import { CategoryComponent } from './admin/category.component';

import { UserListComponent } from './admin/user-list/user-list.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    UnitComponent,
    UserListComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    UnitService,
    UserService,
    CategoryService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
