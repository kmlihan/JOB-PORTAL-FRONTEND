/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AdminDto } from '../models/admin-dto';
import { deleteAdmin } from '../fn/admin-service/delete-admin';
import { DeleteAdmin$Params } from '../fn/admin-service/delete-admin';
import { getAdminById } from '../fn/admin-service/get-admin-by-id';
import { GetAdminById$Params } from '../fn/admin-service/get-admin-by-id';
import { getAllAdmins } from '../fn/admin-service/get-all-admins';
import { GetAllAdmins$Params } from '../fn/admin-service/get-all-admins';


/**
 * AdminService
 */
@Injectable({ providedIn: 'root' })
export class AdminService  extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllAdmins()` */
  static readonly GetAllAdminsPath = '/api/v1/admin';

  /**
   * Get all admins.
   *
   * Get all admins.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAdmins()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAdmins$Response(params?: GetAllAdmins$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getAllAdmins(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all admins.
   *
   * Get all admins.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllAdmins$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAdmins(params?: GetAllAdmins$Params, context?: HttpContext): Observable<string> {
    return this.getAllAdmins$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getAdminById()` */
  static readonly GetAdminByIdPath = '/api/v1/admin/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAdminById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAdminById$Response(params: GetAdminById$Params, context?: HttpContext): Observable<StrictHttpResponse<AdminDto>> {
    return getAdminById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAdminById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAdminById(params: GetAdminById$Params, context?: HttpContext): Observable<AdminDto> {
    return this.getAdminById$Response(params, context).pipe(
      map((r: StrictHttpResponse<AdminDto>): AdminDto => r.body)
    );
  }

  /** Path part for operation `deleteAdmin()` */
  static readonly DeleteAdminPath = '/api/v1/admin/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAdmin()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAdmin$Response(params: DeleteAdmin$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteAdmin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteAdmin$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAdmin(params: DeleteAdmin$Params, context?: HttpContext): Observable<void> {
    return this.deleteAdmin$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
