import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rgb-picker',
  templateUrl: './rgb-picker.component.html',
  styleUrls: ['./rgb-picker.component.scss']
})
export class RgbPickerComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<RgbPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  red: number = 0;
  green: number = 0;
  blue: number = 0;

  alpha: number = 1;


  ngOnInit(): void {
  }
  public getColour() {
    return `rgba(${this.red},${this.green},${this.blue},${this.alpha})`
  }

  public getHex() {
    return this.rgbaToHex(this.getColour());
  }



  private rgbaToHex(rgba: string, forceRemoveAlpha = false) {
    var a_match = rgba.match(/(\d\.?\d?)\)$/);
    var alpha = a_match && a_match.length == 2 ? a_match[1] : a_match;

    forceRemoveAlpha = alpha == '1' || alpha == '0'

    return "#" + rgba.replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
      .split(',') // splits them at ","
      .filter((string, index) => !forceRemoveAlpha || index !== 3)
      .map(string => parseFloat(string)) // Converts them to numbers
      .map((number, index) => index === 3 ? Math.round(number * 255) : number) // Converts alpha to 255 number
      .map(number => number.toString(16)) // Converts numbers to hex
      .map(string => string.length === 1 ? "0" + string : string) // Adds 0 when length of one number is 1
      .join("") // Puts the array to togehter to a string
  }
}
