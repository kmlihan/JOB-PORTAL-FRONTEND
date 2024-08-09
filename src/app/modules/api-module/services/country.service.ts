/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CountryDto } from '../models/country-dto';
import { getCountriesList } from '../fn/country-service/get-countries-list';
import { GetCountriesList$Params } from '../fn/country-service/get-countries-list';
import { getCountry } from '../fn/country-service/get-country';
import { GetCountry$Params } from '../fn/country-service/get-country';


/**
 * CountryService
 */
@Injectable({ providedIn: 'root' })
export class CountryService  extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getCountriesList()` */
  static readonly GetCountriesListPath = '/country';

  /**
   * getListOfCountries.
   *
   * Get list of all countries
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCountriesList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCountriesList$Response(params?: GetCountriesList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CountryDto>>> {
    return getCountriesList(this.http, this.rootUrl, params, context);
  }

  /**
   * getListOfCountries.
   *
   * Get list of all countries
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCountriesList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCountriesList(params?: GetCountriesList$Params, context?: HttpContext): Observable<Array<CountryDto>> {
    return this.getCountriesList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CountryDto>>): Array<CountryDto> => r.body)
    );
  }

  /** Path part for operation `getCountry()` */
  static readonly GetCountryPath = '/country/{countryIso}';

  /**
   * getCountry.
   *
   * Get country
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCountry()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCountry$Response(params: GetCountry$Params, context?: HttpContext): Observable<StrictHttpResponse<CountryDto>> {
    return getCountry(this.http, this.rootUrl, params, context);
  }

  /**
   * getCountry.
   *
   * Get country
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCountry$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCountry(params: GetCountry$Params, context?: HttpContext): Observable<CountryDto> {
    return this.getCountry$Response(params, context).pipe(
      map((r: StrictHttpResponse<CountryDto>): CountryDto => r.body)
    );
  }

}
