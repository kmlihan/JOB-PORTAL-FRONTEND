/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CompanyDto } from '../../models/company-dto';

export interface GetCompanyById$Params {
  id: string;
}

export function getCompanyById(http: HttpClient, rootUrl: string, params: GetCompanyById$Params, context?: HttpContext): Observable<StrictHttpResponse<CompanyDto>> {
  const rb = new RequestBuilder(rootUrl, getCompanyById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CompanyDto>;
    })
  );
}

getCompanyById.PATH = '/api/companies/{id}';
