import { Entity } from 'ngx-entity-service';
import { Category } from './category';

const KEYS =
  [
    'id',
    'category_id',
    'isMaxed'
  ];

export class JourneyStar extends Entity {
  id: number = -1;
  category_id: number = -1;
  isMaxed: false;

  public get isNew(): boolean {
    return this.id === -1;
  }
}