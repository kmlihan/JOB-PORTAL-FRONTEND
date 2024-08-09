/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SimpleStatusDto } from '../../models/simple-status-dto';

export interface SendInterviewLink$Params {
  jobId: string;
  userEmail: string;
}

export function sendInterviewLink(http: HttpClient, rootUrl: string, params: SendInterviewLink$Params, context?: HttpContext): Observable<StrictHttpResponse<SimpleStatusDto>> {
  const rb = new RequestBuilder(rootUrl, sendInterviewLink.PATH, 'post');
  if (params) {
    rb.path('jobId', params.jobId, {});
    rb.path('userEmail', params.userEmail, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SimpleStatusDto>;
    })
  );
}

sendInterviewLink.PATH = '/api/jobs/{jobId}/{userEmail}';
