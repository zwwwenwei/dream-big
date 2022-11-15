import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CachedEntityService, Entity, EntityMapping } from 'ngx-entity-service';
import API_URL from 'src/app/config/constants/apiURL';
import { Teacher } from 'src/app/model/teacher';

export type IloStats = {
  median: number;
  lower: number;
  upper: number;
  min: number;
  max: number;
}[];

@Injectable()
export class TeacherService extends CachedEntityService<Teacher> {
  protected readonly endpointFormat = 'teachers/:id:';
  public readonly rolloverEndpoint = 'teachers/:id:/rollover';

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, API_URL);
  
  this.mapping.addKeys(
    'id',

  );
  }
  public override createInstanceFrom(json: any, other?: any): Teacher {
    return new Teacher();
  }
}