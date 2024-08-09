/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SimpleStatusDto } from '../../models/simple-status-dto';

export interface ResetPassword$Params {
  token: string;
  newPassword: string;
}

export function resetPassword(http: HttpClient, rootUrl: string, params: ResetPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<SimpleStatusDto>> {
  const rb = new RequestBuilder(rootUrl, resetPassword.PATH, 'post');
  if (params) {
    rb.query('token', params.token, {});
    rb.query('newPassword', params.newPassword, {});
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

resetPassword.PATH = '/api/auth/reset-password';
