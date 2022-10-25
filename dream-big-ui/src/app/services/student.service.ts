import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CachedEntityService, Entity, EntityMapping } from 'ngx-entity-service';
import API_URL from 'src/app/config/constants/apiURL';
import { Student } from 'src/app/model/student';

export type IloStats = {
  median: number;
  lower: number;
  upper: number;
  min: number;
  max: number;
}[];

@Injectable()
export class StudentService extends CachedEntityService<Student> {
  protected readonly endpointFormat = 'student/:user_id:';
  public readonly rolloverEndpoint = 'student/:user_id:/rollover';

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, API_URL);
  
  this.mapping.addKeys(
    'id',
    'firstName',
    'lastName',
    'phone',
    'address',
    'user',
    'avatar',
  );
  }
  public override createInstanceFrom(json: any, other?: any): Student {
    return new Student();
  }
}