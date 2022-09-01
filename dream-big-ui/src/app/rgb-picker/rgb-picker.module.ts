import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RgbPickerComponent } from './rgb-picker.component';
import { FormsModule } from '@angular/forms';
import { NgMaterialModule } from '../ng-material/ng-material.module';


@NgModule({
  declarations: [
    RgbPickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgMaterialModule,
  ],
  exports: [RgbPickerComponent],
})
export class RgbPickerModule { }
