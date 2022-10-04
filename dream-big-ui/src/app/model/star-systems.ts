import { Entity } from 'ngx-entity-service';

const KEYS = 
[
  'id',
  'status',
  'student_journey_id'
]

export class StarSystem extends Entity {
  id: number = -1;
  status: string = "";
  student_journey_id: number = -1;

  /**
   * Indicates that the star has yet to be stored in the database
   */
  public get isNew(): boolean {
    return this.id === -1;
  }
}