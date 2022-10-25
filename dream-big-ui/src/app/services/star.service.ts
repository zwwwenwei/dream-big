import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CachedEntityService, Entity, EntityMapping } from 'ngx-entity-service';
import API_URL from 'src/app/config/constants/apiURL';
import { Stars } from 'src/app/model/star';

@Injectable()
export class UnitService extends CachedEntityService<Stars> {
  protected readonly endpointFormat = 'star/:id:';
  public readonly rolloverEndpoint = 'star/:id:/rollover';

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, API_URL);
    this.mapping.addKeys(
      'id',
      'name',
      'goals',
      'reflection',
      'skin_id',
      'star_system_id',
      'status'
    );


  }

  public override createInstanceFrom(json: any, other?: any): Stars {
    return new Stars();
  }
}