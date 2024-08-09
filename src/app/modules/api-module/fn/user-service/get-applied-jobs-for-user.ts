/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JobDto } from '../../models/job-dto';

export interface GetAppliedJobsForUser$Params {
  userId: string;
}

export function getAppliedJobsForUser(http: HttpClient, rootUrl: string, params: GetAppliedJobsForUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<JobDto>>> {
  const rb = new RequestBuilder(rootUrl, getAppliedJobsForUser.PATH, 'get');
  if (params) {
    rb.path('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<JobDto>>;
    })
  );
}

getAppliedJobsForUser.PATH = '/api/users/{userId}/applied-jobs';
