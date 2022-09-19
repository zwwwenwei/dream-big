import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { StudentJourneyService } from './services/student-journey.service';
import { IntroPageComponent } from './Components/intro-page/intro-page.component';
import { AvatarBuilderComponent } from './Components/avatar-builder/avatar-builder.component';

import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { RgbPickerModule } from './rgb-picker/rgb-picker.module';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    StarControlComponent,
    StarComponent,
    IntroPageComponent,
    AvatarBuilderComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AdminModule,
    TableComponentModule,
    NgMaterialModule,
    RgbPickerModule,
   
    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'intro', component: IntroPageComponent },
      { path: 'profile', component: ProfileComponent }
    ]),
  ],
  providers: [
    UnitService,
    UserService,
    CategoryService,
    AuthService,
    StudentService,
    StudentJourneyService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    // {
    // provide: HTTP_INTERCEPTORS,
    //useClass: AuthInterceptor,
    // multi: true
    //.},
    //AuthService,
    //UserService,
    //AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
