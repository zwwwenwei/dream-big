import { Entity } from 'ngx-entity-service';

const KEYS = 
[
  'id',
  'status'
]

export class Planets extends Entity {
  id: number = -1;
  status: string = "";

  /**
   * Indicates that the Planet has yet to be stored in the database
   */
  public get isNew(): boolean {
    return this.id === -1;
  }
}