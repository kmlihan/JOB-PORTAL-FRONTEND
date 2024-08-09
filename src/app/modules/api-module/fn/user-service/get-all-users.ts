/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Page } from '../../models/page';
import { Pageable } from '../../models/pageable';
import { UserSearchCriteria } from '../../models/user-search-criteria';

export interface GetAllUsers$Params {
  pageable: Pageable;
      body: UserSearchCriteria
}

export function getAllUsers(http: HttpClient, rootUrl: string, params: GetAllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<Page>> {
  const rb = new RequestBuilder(rootUrl, getAllUsers.PATH, 'post');
  if (params) {
    rb.query('pageable', params.pageable, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Page>;
    })
  );
}

getAllUsers.PATH = '/api/users';
