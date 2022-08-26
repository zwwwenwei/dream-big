import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CachedEntityService } from 'ngx-entity-service';
import API_URL from 'src/app/config/constants/apiURL';
import { StudentJourney } from 'src/app/model/student-journey';

export type IloStats = {
  median: number;
  lower: number;
  upper: number;
  min: number;
  max: number;
}[];

@Injectable()
export class StudentJourneyService extends CachedEntityService<StudentJourney> {
  protected readonly endpointFormat = 'journey/:id:';
  public readonly rolloverEndpoint = 'journey/:id:/rollover';

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, API_URL);

    this.mapping.addKeys(
      'id',
      'timeline',
      'student_id',
      'student'
    );
  }
  public override createInstanceFrom(json: any, other?: any): StudentJourney {
    return new StudentJourney();
  }
}