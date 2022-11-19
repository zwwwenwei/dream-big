import { Entity } from 'ngx-entity-service';

const KEYS =
  [
    'id',
    'question_id',
    'assessment_id'
  
  ];

export class Answer extends Entity {
  id: number = -1;
  question_id: number = -1;
  assessment_id: number = -1;
  
  /**
   * Indicates that the Unit has yet to be stored in the database
   */
  public get isNew(): boolean {
    return this.id === -1;
  }
}