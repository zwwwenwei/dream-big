import { Entity } from 'ngx-entity-service';

export class Category extends Entity {
  id: number = -1;
  name: string = "";
  description: string = "";
  default_weight: number = -1;

  /**
   * Indicates that the Unit has yet to be stored in the database
   */
  public get isNew(): boolean {
    return this.id === -1;
  }
}