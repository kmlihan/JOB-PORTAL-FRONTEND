/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CompanyDto } from '../../models/company-dto';

export interface UploadLogo$Params {
  companyId: string;
      body?: {
'logo': Blob;
}
}

export function uploadLogo(http: HttpClient, rootUrl: string, params: UploadLogo$Params, context?: HttpContext): Observable<StrictHttpResponse<CompanyDto>> {
  const rb = new RequestBuilder(rootUrl, uploadLogo.PATH, 'post');
  if (params) {
    rb.path('companyId', params.companyId, {});
    rb.body(params.body, 'multipart/form-data');
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

uploadLogo.PATH = '/api/companies/{companyId}/upload-logo';
