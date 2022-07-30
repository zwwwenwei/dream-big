import { Entity } from 'ngx-entity-service';

const KEYS =
  [
    'id',
    'name',
    'description',
    'weight'
  ];

export class Category extends Entity {
  id: number = -1;
  name: string = "";
  description: string = "";
  weight: string = "";

  /**
   * Indicates that the Unit has yet to be stored in the database
   */
  public get isNew(): boolean {
    return this.id === -1;
  }
}