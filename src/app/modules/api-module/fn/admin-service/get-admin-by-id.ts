/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AdminDto } from '../../models/admin-dto';

export interface GetAdminById$Params {
  id: string;
}

export function getAdminById(http: HttpClient, rootUrl: string, params: GetAdminById$Params, context?: HttpContext): Observable<StrictHttpResponse<AdminDto>> {
  const rb = new RequestBuilder(rootUrl, getAdminById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AdminDto>;
    })
  );
}

getAdminById.PATH = '/api/v1/admin/{id}';
