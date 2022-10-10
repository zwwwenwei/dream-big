import { Entity } from 'ngx-entity-service';

const KEYS =
  [
    'id',
    'name',
    'description',
    'weight_value_id'
  ];

export class Avatar extends Entity {
  id: number = -1;
  name: string = "";
  description: string = "";
  weight_value_id: number = -1;

  /**
   * Indicates that the Unit has yet to be stored in the database
   */
  public get isNew(): boolean {
    return this.id === -1;
  }
}