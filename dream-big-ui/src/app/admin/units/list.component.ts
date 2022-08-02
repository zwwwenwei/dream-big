import { Component, OnInit } from '@angular/core';

import { Unit } from 'src/app/model/unit';

import { UnitService } from 'src/app/services/unit.service';

@Component({ templateUrl: 'list.component.html' })
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