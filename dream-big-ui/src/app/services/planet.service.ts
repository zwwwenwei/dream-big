import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CachedEntityService, Entity, EntityMapping } from 'ngx-entity-service';
import API_URL from 'src/app/config/constants/apiURL';
import { Planets } from 'src/app/model/planet';

@Injectable()
export class UnitService extends CachedEntityService<Planets> {
  protected readonly endpointFormat = 'planet/:id:';
  public readonly rolloverEndpoint = 'planet/:id:/rollover';

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, API_URL);
    this.mapping.addKeys(
      'id',
      'name',
      'skin_id',
      'star_system_id',
      'status',
    );


  }

  public override createInstanceFrom(json: any, other?: any): Planets {
    return new Planets();
  }
}