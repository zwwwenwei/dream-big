import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StarSystem } from 'src/app/model/star-systems';
import { Student } from 'src/app/model/student';
import { StudentJourney } from 'src/app/model/student-journey';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { StarSystemService } from 'src/app/services/star-system.service';
import { StudentJourneyService } from 'src/app/services/student-journey.service';
import { StudentService } from 'src/app/services/student.service';
import { WizardDialogComponent } from 'src/app/wizard-dialog/wizard-dialog.component';
import { StarMapComponent } from '../StarMap/star-map.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(StarMapComponent) starmap: StarMapComponent = {} as StarMapComponent;

  private user: User;
  private student: Student;

  private journey: StudentJourney;
  public userStarSystems: StarSystem[];


  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private starSystemService: StarSystemService,
    private studentService: StudentService,
    private studentJourneyService: StudentJourneyService,
  ) { }

  async ngOnInit() {
    await this.getStarSystems();
    this.starmap.loadStarSystems(this.userStarSystems);

  }

  private async getStarSystems() {
    const yes: any = this.authService.currentUserValue;
    const user_id = this.authService.parseJwt(yes.token!).user_id

    this.student = await this.studentService.get({ 'user_id': user_id }).toPromise();
    this.journey = await this.studentJourneyService.get({ 'student_id':this.student.id }).toPromise();
    this.userStarSystems = await this.starSystemService.fetchAll({}, { params: { 'student_journey_id': this.journey.id } }).toPromise();
  }

  public addStarSystem() {
    const dialogRef = this.dialog.open(WizardDialogComponent, {
      // width: '100',
      // data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
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
