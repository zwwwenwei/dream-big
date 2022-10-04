import { Entity } from 'ngx-entity-service';

const KEYS = 
[
  'id',
  'name',
  'asset',
  'color'
]

export class StarSkin extends Entity {
  id: number = -1;
  name: string = "";
  asset: string = "";
  color: string = "";

  /**
   * Indicates that the star skin has yet to be stored in the database
   */
  public get isNew(): boolean {
    return this.id === -1;
  }
}