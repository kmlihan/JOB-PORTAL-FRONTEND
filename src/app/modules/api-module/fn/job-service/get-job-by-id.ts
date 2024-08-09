/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JobDto } from '../../models/job-dto';

export interface GetJobById$Params {
  jobId: string;
}

export function getJobById(http: HttpClient, rootUrl: string, params: GetJobById$Params, context?: HttpContext): Observable<StrictHttpResponse<JobDto>> {
  const rb = new RequestBuilder(rootUrl, getJobById.PATH, 'get');
  if (params) {
    rb.path('jobId', params.jobId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<JobDto>;
    })
  );
}

getJobById.PATH = '/api/jobs/{jobId}';
