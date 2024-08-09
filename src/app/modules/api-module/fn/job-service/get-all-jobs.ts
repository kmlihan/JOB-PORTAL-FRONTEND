/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JobSearchCriteria } from '../../models/job-search-criteria';
import { PageOfJobListDto } from '../../models/page-of-job-list-dto';

export interface GetAllJobs$Params {

/**
 * Zero-based page index (0..N)
 */
  page?: number;

/**
 * The size of the page to be returned
 */
  size?: number;

/**
 * Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
 */
  sort?: Array<string>;
      body: JobSearchCriteria
}

export function getAllJobs(http: HttpClient, rootUrl: string, params: GetAllJobs$Params, context?: HttpContext): Observable<StrictHttpResponse<PageOfJobListDto>> {
  const rb = new RequestBuilder(rootUrl, getAllJobs.PATH, 'put');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.query('sort', params.sort, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageOfJobListDto>;
    })
  );
}

getAllJobs.PATH = '/api/jobs/';
