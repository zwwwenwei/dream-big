import { Entity } from 'ngx-entity-service';

const KEYS = 
[
  'id',
  'code',
  'name',
  'description'
]

export class Unit extends Entity {
  id: number = -1;
  code: string = "";
  name: string = "";
  description: string = "";

  /**
   * Indicates that the Unit has yet to be stored in the database
   */
  public get isNew(): boolean {
    return this.id === -1;
  }
}