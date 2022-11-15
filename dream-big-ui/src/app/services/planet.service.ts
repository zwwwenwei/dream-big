import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CachedEntityService, Entity, EntityMapping } from 'ngx-entity-service';
import API_URL from 'src/app/config/constants/apiURL';
import { Planet } from 'src/app/model/planet';

export type IloStats = {
  median: number;
  lower: number;
  upper: number;
  min: number;
  max: number;
}[];

@Injectable()
export class PlanetService extends CachedEntityService<Planet> {
  protected readonly endpointFormat = 'planets/:id:';
  public readonly rolloverEndpoint = 'planets/:id:/rollover';

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, API_URL);
  
  this.mapping.addKeys(
    'id',
    'name',
    'journey_id'
  );
  }
  public override createInstanceFrom(json: any, other?: any): Planet {
    return new Planet();
  }
}