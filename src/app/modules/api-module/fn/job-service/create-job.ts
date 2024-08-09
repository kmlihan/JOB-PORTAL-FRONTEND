/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JobDto } from '../../models/job-dto';

export interface CreateJob$Params {
      body: JobDto
}

export function createJob(http: HttpClient, rootUrl: string, params: CreateJob$Params, context?: HttpContext): Observable<StrictHttpResponse<JobDto>> {
  const rb = new RequestBuilder(rootUrl, createJob.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

createJob.PATH = '/api/jobs/';
