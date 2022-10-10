import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CachedEntityService, Entity, EntityMapping } from 'ngx-entity-service';
import API_URL from 'src/app/config/constants/apiURL';
import { Avatar } from 'src/app/model/avatar';

export type IloStats = {
  median: number;
  lower: number;
  upper: number;
  min: number;
  max: number;
}[];

@Injectable()
export class AvatarService extends CachedEntityService<Avatar> {
  protected readonly endpointFormat = 'avatar/:id:';
  public readonly rolloverEndpoint = 'avatar/:id:/rollover';

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, API_URL);
  
  this.mapping.addKeys(
    'id',
    'avatar_heads_id',
    'avatar_torsos_id',
    'avatar_hairs_id',
    'avatar_accessories_id',

  );
  }
  public override createInstanceFrom(json: any, other?: any): Avatar{
    return new Avatar();
  }
}