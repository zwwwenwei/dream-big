import { Entity } from 'ngx-entity-service';

const KEYS =
  [
    'id',
    'categoryName',
    'description',
    'weight'
  ];

export class Category extends Entity {
  id: number = -1;
  categoryName: string = "";
  description: string = "";
  weight: string = "";

  /**
   * Indicates that the Unit has yet to be stored in the database
   */
  public get isNew(): boolean {
    return this.id === -1;
  }
}