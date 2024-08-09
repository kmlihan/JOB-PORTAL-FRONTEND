/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CompanyDto } from '../../models/company-dto';

export interface UpdateCompany$Params {
  id: string;
      body: CompanyDto
}

export function updateCompany(http: HttpClient, rootUrl: string, params: UpdateCompany$Params, context?: HttpContext): Observable<StrictHttpResponse<CompanyDto>> {
  const rb = new RequestBuilder(rootUrl, updateCompany.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CompanyDto>;
    })
  );
}

updateCompany.PATH = '/api/companies/{id}';
