import { Entity } from 'ngx-entity-service';

const KEYS =
  [
    'id',
    'reflection_text',
    'section_id',
    'goal_id'
  ];

export class Reflection extends Entity {
  id: number = -1;
  reflection_text: string = "";
  section_id: number = -1;
  goal_id: number = -1;
  

  /**
   * Indicates that the Unit has yet to be stored in the database
   */
  public get isNew(): boolean {
    return this.id === -1;
  }
}