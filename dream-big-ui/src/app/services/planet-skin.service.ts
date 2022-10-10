import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CachedEntityService, Entity, EntityMapping } from 'ngx-entity-service';
import API_URL from 'src/app/config/constants/apiURL';
import { PlanetsSkin } from 'src/app/model/planet-skin';

@Injectable()
export class UnitService extends CachedEntityService<PlanetsSkin> {
  protected readonly endpointFormat = 'planetskin/:id:';
  public readonly rolloverEndpoint = 'planetskin/:id:/rollover';

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, API_URL);
    this.mapping.addKeys(
      'id',
      'name',
      'asset',
      'color',
    );


  }

  public override createInstanceFrom(json: any, other?: any): PlanetsSkin {
    return new PlanetsSkin();
  }
}