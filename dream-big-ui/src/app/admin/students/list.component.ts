import { Component, OnInit } from '@angular/core';

import { Student } from 'src/app/model/student';

import { StudentService } from 'src/app/services/student.service';

@Component({
    // templateUrl: 'list.component.html' ,
    template: `
    <app-table [data]="students" title="Students" >

      <ng-template #headers>
        <th>Name</th>
        <th>Phone</th>
        <th>User</th>
        <th style="display: flex; justify-content: right;"><a routerLink="add" class="btn btn-success">Create</a></th>
      </ng-template>
      <ng-template #rows let-row>
        <td>{{ row.name }}</td>
        <td>{{row.phone}}</td>
        <td>{{row.user.name}}</td>
        <th style="white-space: nowrap; display: flex; justify-content: right;">
                <a routerLink="edit/{{row.id}}" class="btn btn-sm btn-primary mx-1">
                    <i class="fas fa-pen-to-square delete"></i>
                </a>
                <button (click)="deleteStudent(row.id)" class="btn btn-sm btn-danger btn-delete-user" type="button">
                    <i class="fas fa-trash-alt delete"></i>
                </button>
        </th>
      </ng-template>
    </app-table>
  `,
})
export class ListComponent implements OnInit {
    students: Student[] = [];

    constructor(
        private studentService: StudentService,
    ) { }

    ngOnInit() {
        this.studentService.query().subscribe({
            next: (students) => {
                this.students = students;
            }
        });
    }

    deleteStudent(id: number) {
        this.studentService.delete(id).subscribe(() => { this.students = this.students.filter((u: Student) => u.id != id) });
    }
}