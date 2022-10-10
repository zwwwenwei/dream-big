import { Entity } from 'ngx-entity-service';

const KEYS =
  [
    'id',
    'avatar_heads_id',
    'avatar_torsos_id',
    'avatar_hairs_id',
    'avatar_accessories_id',
  ];

export class Avatar extends Entity {
  id: number = -1;
  avatar_heads_id: number = -1;
  avatar_torsos_id: number = -1;
  avatar_hairs_id: number = -1;
  avatar_accessories_id: number = -1;
  

  /**
   * Indicates that the Unit has yet to be stored in the database
   */
  public get isNew(): boolean {
    return this.id === -1;
  }
}