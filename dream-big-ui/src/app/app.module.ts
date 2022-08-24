import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UnitService } from './services/unit.service';
import { CategoryService } from './services/category.service';

import { UserService } from './services/user.service';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { StarControlComponent } from './Components/StarControl/star-control.component';
import { StarComponent } from './Components/Star/star.component';

import { AdminModule } from './admin/admin.module';
import { TableComponentModule } from './admin/generic/table.component';
import { StudentService } from './services/student.service';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    StarControlComponent,
    StarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AdminModule,
    TableComponentModule
  ],
  providers: [
    UnitService,
    UserService,
    CategoryService,
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
