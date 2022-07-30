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
    private unitService: UnitService
  ) {
    this.unitService.query().subscribe({
      next: (units) => {
        this.units = units;
      }
    });

    // const unit = this.units[0];
    // unit.id = 0;
    // this.unitService.update(unit).subscribe({
    //   next: (unit) => { console.log("success") },
    //   error: (message) => { console.log("error") }
    // });
  }
  public addUnit(code: string, name: string, description: string) {
    const data = {
      code,
      name,
      description
    }


    this.unitService.create(data).subscribe(
      (unit: Unit) => {
        this.units.push(unit);
      }
    );
  }
}
