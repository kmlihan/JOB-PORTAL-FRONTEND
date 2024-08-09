/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserDto } from '../../models/user-dto';

export interface ApplyToJob$Params {
  userId: string;
  jobId: string;
}

export function applyToJob(http: HttpClient, rootUrl: string, params: ApplyToJob$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
  const rb = new RequestBuilder(rootUrl, applyToJob.PATH, 'post');
  if (params) {
    rb.path('userId', params.userId, {});
    rb.path('jobId', params.jobId, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserDto>;
    })
  );
}

applyToJob.PATH = '/api/users/apply/{userId}/{jobId}';
