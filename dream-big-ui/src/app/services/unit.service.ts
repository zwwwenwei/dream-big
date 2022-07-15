import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CachedEntityService, Entity, EntityMapping } from 'ngx-entity-service';
import API_URL from 'src/app/config/constants/apiURL';
import { AppInjector } from 'src/app/app-injector';
import { Unit } from 'src/app/model/unit';

export type IloStats = {
  median: number;
  lower: number;
  upper: number;
  min: number;
  max: number;
}[];

@Injectable()
export class UnitService extends CachedEntityService<Unit> {
  protected readonly endpointFormat = 'units/:id:';
  public readonly rolloverEndpoint = 'units/:id:/rollover';

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, API_URL);
  }

  public override createInstanceFrom(json: any, other?: any): Unit {
    return new Unit();
  }
}