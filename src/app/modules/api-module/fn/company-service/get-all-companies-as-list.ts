/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CompanyDto } from '../../models/company-dto';

export interface GetAllCompaniesAsList$Params {
}

export function getAllCompaniesAsList(http: HttpClient, rootUrl: string, params?: GetAllCompaniesAsList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CompanyDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllCompaniesAsList.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CompanyDto>>;
    })
  );
}

getAllCompaniesAsList.PATH = '/api/companies/all';
