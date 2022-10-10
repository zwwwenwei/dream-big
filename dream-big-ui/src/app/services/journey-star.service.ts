import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CachedEntityService, Entity, EntityMapping } from 'ngx-entity-service';
import API_URL from 'src/app/config/constants/apiURL';
import { Category } from 'src/app/model/category';
import { JourneyStar } from 'src/app/model/journey-star';

export type IloStats = {
  median: number;
  lower: number;
  upper: number;
  min: number;
  max: number;
}[];

@Injectable()
export class JourneyStarService extends CachedEntityService<JourneyStar> {
  protected readonly endpointFormat = 'journey-star/:id:';
  public readonly rolloverEndpoint = 'journey-star/:id:/rollover';

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, API_URL);
  
  this.mapping.addKeys(
    'id',
    'category_id',
    'isMaxed'
  );
  }
  public override createInstanceFrom(json: any, other?: any): JourneyStar {
    return new JourneyStar();
  }
}