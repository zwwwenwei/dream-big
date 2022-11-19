import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CachedEntityService, Entity, EntityMapping } from 'ngx-entity-service';
import API_URL from 'src/app/config/constants/apiURL';
import { Section } from 'src/app/model/section';

export type IloStats = {
  median: number;
  lower: number;
  upper: number;
  min: number;
  max: number;
}[];

@Injectable()
export class SectionService extends CachedEntityService<Section> {
  protected readonly endpointFormat = 'sections/:id:';
  public readonly rolloverEndpoint = 'sections/:id:/rollover';

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, API_URL);
  
  this.mapping.addKeys(
    'id',
    'planet_id',
    'category_id'
  );
  }
  public override createInstanceFrom(json: any, other?: any): Section {
    return new Section();
  }
}