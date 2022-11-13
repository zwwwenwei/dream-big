import { Entity } from 'ngx-entity-service';
import { User } from './user';
import { Avatar} from './avatar';

const KEYS =
  [
    'id',
    'firstName',
    'lastName',
    'phone',
    'address',
    'user',
    'avatar',
    'student_journey'
  ];

export class Student extends Entity {
  id: number = -1;
  firstName: string = "";
  lastName: string = "";
  address: string = "";
  phone: number = -1;
  user: User = {} as User;
  user_id: number = -1;
  avatar: Avatar = {} as Avatar;
  avatar_id: number = -1;

  /**
   * Indicates that the Unit has yet to be stored in the database
   */
  public get isNew(): boolean {
    return this.id === -1;
  }
}