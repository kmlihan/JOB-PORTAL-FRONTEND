/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CompanyDto } from '../models/company-dto';
import { deleteCompany } from '../fn/company-service/delete-company';
import { DeleteCompany$Params } from '../fn/company-service/delete-company';
import { getAllCompanies } from '../fn/company-service/get-all-companies';
import { GetAllCompanies$Params } from '../fn/company-service/get-all-companies';
import { getAllCompaniesAsList } from '../fn/company-service/get-all-companies-as-list';
import { GetAllCompaniesAsList$Params } from '../fn/company-service/get-all-companies-as-list';
import { getAllJobsForCompany } from '../fn/company-service/get-all-jobs-for-company';
import { GetAllJobsForCompany$Params } from '../fn/company-service/get-all-jobs-for-company';
import { getCompanyById } from '../fn/company-service/get-company-by-id';
import { GetCompanyById$Params } from '../fn/company-service/get-company-by-id';
import { JobDto } from '../models/job-dto';
import { Page } from '../models/page';
import { SimpleStatusDto } from '../models/simple-status-dto';
import { updateCompany } from '../fn/company-service/update-company';
import { UpdateCompany$Params } from '../fn/company-service/update-company';
import { uploadLogo } from '../fn/company-service/upload-logo';
import { UploadLogo$Params } from '../fn/company-service/upload-logo';


/**
 * CompanyService
 */
@Injectable({ providedIn: 'root' })
export class CompanyService  extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getCompanyById()` */
  static readonly GetCompanyByIdPath = '/api/companies/{id}';

  /**
   * Get company by id.
   *
   * Get company by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCompanyById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCompanyById$Response(params: GetCompanyById$Params, context?: HttpContext): Observable<StrictHttpResponse<CompanyDto>> {
    return getCompanyById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get company by id.
   *
   * Get company by id.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCompanyById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCompanyById(params: GetCompanyById$Params, context?: HttpContext): Observable<CompanyDto> {
    return this.getCompanyById$Response(params, context).pipe(
      map((r: StrictHttpResponse<CompanyDto>): CompanyDto => r.body)
    );
  }

  /** Path part for operation `updateCompany()` */
  static readonly UpdateCompanyPath = '/api/companies/{id}';

  /**
   * Update company .
   *
   * Update company .
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCompany()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCompany$Response(params: UpdateCompany$Params, context?: HttpContext): Observable<StrictHttpResponse<CompanyDto>> {
    return updateCompany(this.http, this.rootUrl, params, context);
  }

  /**
   * Update company .
   *
   * Update company .
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCompany$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCompany(params: UpdateCompany$Params, context?: HttpContext): Observable<CompanyDto> {
    return this.updateCompany$Response(params, context).pipe(
      map((r: StrictHttpResponse<CompanyDto>): CompanyDto => r.body)
    );
  }

  /** Path part for operation `deleteCompany()` */
  static readonly DeleteCompanyPath = '/api/companies/{id}';

  /**
   * Delete company .
   *
   * Delete company .
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCompany()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCompany$Response(params: DeleteCompany$Params, context?: HttpContext): Observable<StrictHttpResponse<SimpleStatusDto>> {
    return deleteCompany(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete company .
   *
   * Delete company .
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCompany$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCompany(params: DeleteCompany$Params, context?: HttpContext): Observable<SimpleStatusDto> {
    return this.deleteCompany$Response(params, context).pipe(
      map((r: StrictHttpResponse<SimpleStatusDto>): SimpleStatusDto => r.body)
    );
  }

  /** Path part for operation `getAllCompanies()` */
  static readonly GetAllCompaniesPath = '/api/companies';

  /**
   * Get all companies.
   *
   * List all comapnies.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCompanies()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getAllCompanies$Response(params: GetAllCompanies$Params, context?: HttpContext): Observable<StrictHttpResponse<Page>> {
    return getAllCompanies(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all companies.
   *
   * List all comapnies.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCompanies$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getAllCompanies(params: GetAllCompanies$Params, context?: HttpContext): Observable<Page> {
    return this.getAllCompanies$Response(params, context).pipe(
      map((r: StrictHttpResponse<Page>): Page => r.body)
    );
  }

  /** Path part for operation `uploadLogo()` */
  static readonly UploadLogoPath = '/api/companies/{companyId}/upload-logo';

  /**
   * Upload company logo.
   *
   * Upload a logo for the specified company.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadLogo()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadLogo$Response(params: UploadLogo$Params, context?: HttpContext): Observable<StrictHttpResponse<CompanyDto>> {
    return uploadLogo(this.http, this.rootUrl, params, context);
  }

  /**
   * Upload company logo.
   *
   * Upload a logo for the specified company.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadLogo$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadLogo(params: UploadLogo$Params, context?: HttpContext): Observable<CompanyDto> {
    return this.uploadLogo$Response(params, context).pipe(
      map((r: StrictHttpResponse<CompanyDto>): CompanyDto => r.body)
    );
  }

  /** Path part for operation `getAllJobsForCompany()` */
  static readonly GetAllJobsForCompanyPath = '/api/companies/{companyId}/jobs';

  /**
   * Get all jobs for company.
   *
   * Get all jobs for company.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllJobsForCompany()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllJobsForCompany$Response(params: GetAllJobsForCompany$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<JobDto>>> {
    return getAllJobsForCompany(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all jobs for company.
   *
   * Get all jobs for company.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllJobsForCompany$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllJobsForCompany(params: GetAllJobsForCompany$Params, context?: HttpContext): Observable<Array<JobDto>> {
    return this.getAllJobsForCompany$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<JobDto>>): Array<JobDto> => r.body)
    );
  }

  /** Path part for operation `getAllCompaniesAsList()` */
  static readonly GetAllCompaniesAsListPath = '/api/companies/all';

  /**
   * Get all companies.
   *
   * Retrieve all companies as a list
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCompaniesAsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCompaniesAsList$Response(params?: GetAllCompaniesAsList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CompanyDto>>> {
    return getAllCompaniesAsList(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all companies.
   *
   * Retrieve all companies as a list
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCompaniesAsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCompaniesAsList(params?: GetAllCompaniesAsList$Params, context?: HttpContext): Observable<Array<CompanyDto>> {
    return this.getAllCompaniesAsList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CompanyDto>>): Array<CompanyDto> => r.body)
    );
  }

}
