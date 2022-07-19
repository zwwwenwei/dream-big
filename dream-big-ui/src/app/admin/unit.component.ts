import { Component } from '@angular/core';
import { UnitService } from '../services/unit.service';
import { Unit } from '../model/unit';

@Component({
  selector: 'app-root',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent {
  title = 'dream-big-ui';
  units: Unit[] = [];

  constructor(
    private unitService: UnitService
  ) {
    unitService.query().subscribe({
      next: (units) => {
        this.units = units;
      }
    });
    

    const unit = this.units[0];
    unit.code = "somethiung";
    unitService.update(unit).subscribe({
      next: (unit) => { console.log("success") },
      error: (message) => { console.log("error") }
    });
  }
}
