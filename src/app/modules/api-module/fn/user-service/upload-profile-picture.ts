/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SimpleStatusDto } from '../../models/simple-status-dto';

export interface UploadProfilePicture$Params {
  userId: string;
      body?: {
'file': Blob;
}
}

export function uploadProfilePicture(http: HttpClient, rootUrl: string, params: UploadProfilePicture$Params, context?: HttpContext): Observable<StrictHttpResponse<SimpleStatusDto>> {
  const rb = new RequestBuilder(rootUrl, uploadProfilePicture.PATH, 'post');
  if (params) {
    rb.path('userId', params.userId, {});
    rb.body(params.body, 'multipart/form-data');
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

uploadProfilePicture.PATH = '/api/users/{userId}/profilePicture';
