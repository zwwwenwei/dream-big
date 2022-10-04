import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CachedEntityService, Entity, EntityMapping } from 'ngx-entity-service';
import API_URL from 'src/app/config/constants/apiURL';
import { StarSkin } from 'src/app/model/star-skin';

@Injectable()
export class UnitService extends CachedEntityService<StarSkin> {
  protected readonly endpointFormat = 'starskin/:id:';
  public readonly rolloverEndpoint = 'starskin/:id:/rollover';

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

  public override createInstanceFrom(json: any, other?: any): StarSkin {
    return new StarSkin();
  }
}