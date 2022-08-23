import { Entity } from 'ngx-entity-service';
import { User } from './user';

const KEYS =
  [
    'id',
    'name',
    'phone',
    'address',
    'user'
  ];

export class Student extends Entity {
  id: number = -1;
  name: string = "";
  address: string = "";
  phone: number = -1;
  user: User = {} as User;
  user_id: number = -1;

  /**
   * Indicates that the Unit has yet to be stored in the database
   */
  public get isNew(): boolean {
    return this.id === -1;
  }
}