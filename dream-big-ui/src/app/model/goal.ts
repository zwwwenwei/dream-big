import { Entity } from 'ngx-entity-service';

const KEYS =
  [
    'id',
    'goal_text',
    'status',
    'section_id'
  
  ];

export class Goal extends Entity {
  id: number = -1;
  goal_text: string = "";
  status: boolean = false;
  section_id: number = -1;
  

  /**
   * Indicates that the Unit has yet to be stored in the database
   */
  public get isNew(): boolean {
    return this.id === -1;
  }
}