import { Component, OnInit } from '@angular/core';

import { Unit } from 'src/app/model/unit';

import { UnitService } from 'src/app/services/unit.service';

@Component({ 
    template: `
    <app-table [data]="units" title="Units" >

      <ng-template #headers>
        <th>Name</th>
        <th>Code</th>
        <th>Description</th>
        <th style="display: flex; justify-content: right;"><a routerLink="add" class="btn btn-success">Create</a></th>
      </ng-template>
      <ng-template #rows let-row>
        <td>{{ row.name }}</td>
        <td>{{row.code}}</td>
        <td>{{row.description}}</td>
        <th style="white-space: nowrap; display: flex; justify-content: right;">
                <a routerLink="edit/{{row.id}}" class="btn btn-sm btn-primary mx-1">
                    <i class="fas fa-pen-to-square delete"></i>
                </a>
                <button (click)="deleteUnit(row.id)" class="btn btn-sm btn-danger btn-delete-user" type="button">
                    <i class="fas fa-trash-alt delete"></i>
                </button>
        </th>
      </ng-template>
    </app-table>
  `,
})
export class ListComponent implements OnInit {
    units: Unit[] = [];

    constructor(
        private unitService: UnitService,
    ) { }

    ngOnInit() {
        this.unitService.query().subscribe({
            next: (units) => {
                this.units = units;
            }
        });
    }

    deleteUnit(id: number) {
        this.unitService.delete(id).subscribe(() => { this.units = this.units.filter((u: Unit) => u.id != id ) } );
    }
}