import { Entity } from 'ngx-entity-service';

const KEYS = 
[
  'id',
  'name',
  'skin_id',
  'star_system_id',
  'status'
]

export class Planet extends Entity {
  id: number = -1;
  name: string = "";
  skin_id: number =-1;
  star_system_id: number = -1;
  status: string = "";

  /**
   * Indicates that the Planet has yet to be stored in the database
   */
  public get isNew(): boolean {
    return this.id === -1;
  }
}