import { IterableChangeRecord } from '@angular/core';
import { Entity } from 'ngx-entity-service';

const KEYS =
  [
    'id',
    'username',
    'name',
    'password',
    'token',
    'role'
  ];

export class User extends Entity {
  public id: number = -1;
  public username: string = '';
  public name: string = '';
  public password: string = '';
  public role_id: number = -1;



  public keyForJson(json: any): string {
    return json.username;
  }
  public get isNew(): boolean {
    return this.id === -1;
  }
}