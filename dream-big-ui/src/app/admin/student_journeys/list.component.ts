import { Component, OnInit } from '@angular/core';

import { Student } from 'src/app/model/student';
import { StudentJourney } from 'src/app/model/student-journey';

import { StudentService } from 'src/app/services/student.service';
import { StudentJourneyService } from 'src/app/services/student-journey.service';

@Component({
    // templateUrl: 'list.component.html' ,
    template: `
    <app-table [data]="student_journeys" title="Student Journeys" >

      <ng-template #headers>
        <th>#</th>
        <th>Timeline</th>
        <th>Student</th>
        <th style="display: flex; justify-content: right;"><a routerLink="add" class="btn btn-success">Create</a></th>
      </ng-template>
      <ng-template #rows let-row>
        <td>{{ row.id }}</td>
        <td>{{row.timeline}}</td>
        <td>{{row.student.name}}</td>
        <th style="white-space: nowrap; display: flex; justify-content: right;">
                <a routerLink="edit/{{row.id}}" class="btn btn-sm btn-primary mx-1">
                    <i class="fas fa-pen-to-square delete"></i>
                </a>
                <button (click)="deleteStudentJourney(row.id)" class="btn btn-sm btn-danger btn-delete-user" type="button">
                    <i class="fas fa-trash-alt delete"></i>
                </button>
        </th>
      </ng-template>
    </app-table>
  `,
})
export class ListComponent implements OnInit {
    student_journeys: StudentJourney[] = [];
    students: Student[] = [];
    students_map: Record<number, Student> = {};

    constructor(
        private studentJourneyService: StudentJourneyService,
    ) { }
    ngOnChanges() {
        this.studentJourneyService.query().subscribe({
            next: (student_journeys) => {
                this.student_journeys = student_journeys;
            }
        });
    }
    ngOnInit() {
        this.studentJourneyService.query().subscribe({
            next: (student_journeys) => {
                this.student_journeys = student_journeys;
            }
        });

    }

    deleteStudentJourney(id: number) {
        this.studentJourneyService.delete(id).subscribe(() => { this.student_journeys = this.student_journeys.filter((u: StudentJourney) => u.id != id) });
    }
}