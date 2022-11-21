import { DialogRef, DIALOG_DATA } from "@angular/cdk/dialog";
import { Component, Inject } from "@angular/core";
import { Section } from "src/app/helpers/types";

export interface DialogData {
	name: string;
  }

@Component({
	selector: 'app-section-dialog',
	templateUrl: 'section-dialog.component.html',
})
export class SectionDialogComponent {
	constructor(public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public data: Section) { }
}