import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CachedEntityService, Entity, EntityMapping } from 'ngx-entity-service';
import API_URL from 'src/app/config/constants/apiURL';
import { StarSystem } from 'src/app/model/star-systems';

@Injectable()
export class UnitService extends CachedEntityService<StarSystem> {
  protected readonly endpointFormat = 'starsystem/:id:';
  public readonly rolloverEndpoint = 'starsystem/:id:/rollover';

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, API_URL);
    this.mapping.addKeys(
      'id',
      'status',
    );


  }

  public override createInstanceFrom(json: any, other?: any): StarSystem {
    return new StarSystem();
  }
}