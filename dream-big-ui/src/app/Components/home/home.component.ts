import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/model/student';

import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

import { StudentService } from 'src/app/services/student.service';
import { StarMapComponent } from '../StarMap/star-map.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(StarMapComponent) starmap: StarMapComponent = {} as StarMapComponent;

  constructor(
    public dialog: MatDialog,


  ) { }

  async ngOnInit() {

    this.starmap.createStarSystems();

  }



  public addStarSystem() {
    // const dialogRef = this.dialog.open(WizardDialogComponent, {
    //   // width: '100',
    //   // data: { name: this.name, animal: this.animal },
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   // this.animal = result;
    // });

  }

  public viewStarSystem() {
    setTimeout(() => {
      this.starmap.isSystemView = true;
      this.starmap.drawScene(true);
    });
  }

  public viewStarMap() {
    setTimeout(() => {
      this.starmap.isSystemView = false;
      this.starmap.drawScene();
    });
  }
}
