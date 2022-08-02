import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CachedEntityService, Entity, EntityMapping } from 'ngx-entity-service';
import API_URL from 'src/app/config/constants/apiURL';
import { Unit } from 'src/app/model/unit';

@Injectable()
export class UnitService extends CachedEntityService<Unit> {
  protected readonly endpointFormat = 'units/:id:';
  public readonly rolloverEndpoint = 'units/:id:/rollover';

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, API_URL);
    this.mapping.addKeys(
      'id',
      'name',
      'code',
      'description',
    );


  }

  public override createInstanceFrom(json: any, other?: any): Unit {
    return new Unit();
  }
}