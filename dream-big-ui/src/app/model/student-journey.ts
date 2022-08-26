import { Entity } from 'ngx-entity-service';
import { Student } from './student';

const KEYS =
  [
    'id',
    'timeline',
    'student_id',
    'student'
  ];

export class StudentJourney extends Entity {
  id: number = -1;
  timeline: string = "";
  student_id: number = -1;
  student: Student = {} as Student;

  /**
   * Indicates that the Unit has yet to be stored in the database
   */
  public get isNew(): boolean {
    return this.id === -1;
  }
}