import { Component } from '@angular/core';
import { UnitService } from '../services/unit.service';
import { Unit } from '../model/unit';

@Component({
  selector: 'app-units',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})



export class UnitComponent {
  title = 'dream-big-ui';
  units: Unit[] = [];

  constructor(
    private unitService: UnitService,
  ) {

    this.unitService.query().subscribe({
      next: (units) => {
        this.units = units;
      }
    });
  }
 

  // public addUnit(code: string, name: string, description: string) {
  //   const data = {
  //     code,
  //     name,
  //     description
  //   }


  //   this.unitService.create(data).subscribe(
  //     (unit: Unit) => {
  //       this.units.push(unit);
  //     }
  //   );
  // }
}
