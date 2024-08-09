/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SimpleStatusDto } from '../../models/simple-status-dto';

export interface DeleteJob$Params {
  jobId: string;
}

export function deleteJob(http: HttpClient, rootUrl: string, params: DeleteJob$Params, context?: HttpContext): Observable<StrictHttpResponse<SimpleStatusDto>> {
  const rb = new RequestBuilder(rootUrl, deleteJob.PATH, 'delete');
  if (params) {
    rb.path('jobId', params.jobId, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SimpleStatusDto>;
    })
  );
}

deleteJob.PATH = '/api/jobs/{jobId}';
