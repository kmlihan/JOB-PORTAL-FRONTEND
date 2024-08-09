/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CountryDto } from '../../models/country-dto';

export interface GetCountriesList$Params {
}

export function getCountriesList(http: HttpClient, rootUrl: string, params?: GetCountriesList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CountryDto>>> {
  const rb = new RequestBuilder(rootUrl, getCountriesList.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CountryDto>>;
    })
  );
}

getCountriesList.PATH = '/country';
