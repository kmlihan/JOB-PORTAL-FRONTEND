/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CountryDto } from '../../models/country-dto';

export interface GetCountry$Params {
  countryIso: string;
}

export function getCountry(http: HttpClient, rootUrl: string, params: GetCountry$Params, context?: HttpContext): Observable<StrictHttpResponse<CountryDto>> {
  const rb = new RequestBuilder(rootUrl, getCountry.PATH, 'get');
  if (params) {
    rb.path('countryIso', params.countryIso, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CountryDto>;
    })
  );
}

getCountry.PATH = '/country/{countryIso}';
