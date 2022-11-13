import { Entity } from 'ngx-entity-service';
import { Planet } from './planet';
const KEYS = 
[
  'id',
  'status',
  'student_journey_id',
  'star',
  'planets',
  'name'
]

export class StarSystem extends Entity {
  id: number = -1;
  status: string = "";
  student_journey_id: number = -1;
  planets: Planet[];

  /**
   * Indicates that the star has yet to be stored in the database
   */
  public get isNew(): boolean {
    return this.id === -1;
  }
}