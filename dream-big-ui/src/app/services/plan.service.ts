import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CachedEntityService, Entity, EntityMapping } from 'ngx-entity-service';
import API_URL from 'src/app/config/constants/apiURL';
import { Plan } from 'src/app/model/plan';

export type IloStats = {
  median: number;
  lower: number;
  upper: number;
  min: number;
  max: number;
}[];

@Injectable()
export class PlanService extends CachedEntityService<Plan> {
  protected readonly endpointFormat = 'plans/:id:';
  public readonly rolloverEndpoint = 'plans/:id:/rollover';

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, API_URL);
  
  this.mapping.addKeys(
    'id',
    'section_id',
    'goal_id',
    'plan_text'
  );
  }
  public override createInstanceFrom(json: any, other?: any): Plan {
    return new Plan();
  }
}