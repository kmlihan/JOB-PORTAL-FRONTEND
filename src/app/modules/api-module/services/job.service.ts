/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createJob } from '../fn/job-service/create-job';
import { CreateJob$Params } from '../fn/job-service/create-job';
import { deleteJob } from '../fn/job-service/delete-job';
import { DeleteJob$Params } from '../fn/job-service/delete-job';
import { downloadJobPdf } from '../fn/job-service/download-job-pdf';
import { DownloadJobPdf$Params } from '../fn/job-service/download-job-pdf';
import { getAllJobs } from '../fn/job-service/get-all-jobs';
import { GetAllJobs$Params } from '../fn/job-service/get-all-jobs';
import { getJobById } from '../fn/job-service/get-job-by-id';
import { GetJobById$Params } from '../fn/job-service/get-job-by-id';
import { JobDto } from '../models/job-dto';
import { PageOfJobListDto } from '../models/page-of-job-list-dto';
import { sendInterviewLink } from '../fn/job-service/send-interview-link';
import { SendInterviewLink$Params } from '../fn/job-service/send-interview-link';
import { SimpleStatusDto } from '../models/simple-status-dto';
import { updateJob } from '../fn/job-service/update-job';
import { UpdateJob$Params } from '../fn/job-service/update-job';


/**
 * JobService
 */
@Injectable({ providedIn: 'root' })
export class JobService  extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getJobById()` */
  static readonly GetJobByIdPath = '/api/jobs/{jobId}';

  /**
   * Get job by id.
   *
   * Get job by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getJobById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJobById$Response(params: GetJobById$Params, context?: HttpContext): Observable<StrictHttpResponse<JobDto>> {
    return getJobById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get job by id.
   *
   * Get job by id.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getJobById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJobById(params: GetJobById$Params, context?: HttpContext): Observable<JobDto> {
    return this.getJobById$Response(params, context).pipe(
      map((r: StrictHttpResponse<JobDto>): JobDto => r.body)
    );
  }

  /** Path part for operation `updateJob()` */
  static readonly UpdateJobPath = '/api/jobs/{jobId}';

  /**
   * Update job .
   *
   * Update job.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateJob()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateJob$Response(params: UpdateJob$Params, context?: HttpContext): Observable<StrictHttpResponse<JobDto>> {
    return updateJob(this.http, this.rootUrl, params, context);
  }

  /**
   * Update job .
   *
   * Update job.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateJob$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateJob(params: UpdateJob$Params, context?: HttpContext): Observable<JobDto> {
    return this.updateJob$Response(params, context).pipe(
      map((r: StrictHttpResponse<JobDto>): JobDto => r.body)
    );
  }

  /** Path part for operation `deleteJob()` */
  static readonly DeleteJobPath = '/api/jobs/{jobId}';

  /**
   * Delete job.
   *
   * Delete job .
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteJob()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteJob$Response(params: DeleteJob$Params, context?: HttpContext): Observable<StrictHttpResponse<SimpleStatusDto>> {
    return deleteJob(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete job.
   *
   * Delete job .
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteJob$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteJob(params: DeleteJob$Params, context?: HttpContext): Observable<SimpleStatusDto> {
    return this.deleteJob$Response(params, context).pipe(
      map((r: StrictHttpResponse<SimpleStatusDto>): SimpleStatusDto => r.body)
    );
  }

  /** Path part for operation `getAllJobs()` */
  static readonly GetAllJobsPath = '/api/jobs/';

  /**
   * Get all jobs.
   *
   * List all jobs based on search criteria.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllJobs()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getAllJobs$Response(params: GetAllJobs$Params, context?: HttpContext): Observable<StrictHttpResponse<PageOfJobListDto>> {
    return getAllJobs(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all jobs.
   *
   * List all jobs based on search criteria.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllJobs$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getAllJobs(params: GetAllJobs$Params, context?: HttpContext): Observable<PageOfJobListDto> {
    return this.getAllJobs$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageOfJobListDto>): PageOfJobListDto => r.body)
    );
  }

  /** Path part for operation `createJob()` */
  static readonly CreateJobPath = '/api/jobs/';

  /**
   * Create job .
   *
   * Create job.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createJob()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createJob$Response(params: CreateJob$Params, context?: HttpContext): Observable<StrictHttpResponse<JobDto>> {
    return createJob(this.http, this.rootUrl, params, context);
  }

  /**
   * Create job .
   *
   * Create job.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createJob$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createJob(params: CreateJob$Params, context?: HttpContext): Observable<JobDto> {
    return this.createJob$Response(params, context).pipe(
      map((r: StrictHttpResponse<JobDto>): JobDto => r.body)
    );
  }

  /** Path part for operation `sendInterviewLink()` */
  static readonly SendInterviewLinkPath = '/api/jobs/{jobId}/{userEmail}';

  /**
   * Send interview link.
   *
   * Send an interview link to the specified user for the given job.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendInterviewLink()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendInterviewLink$Response(params: SendInterviewLink$Params, context?: HttpContext): Observable<StrictHttpResponse<SimpleStatusDto>> {
    return sendInterviewLink(this.http, this.rootUrl, params, context);
  }

  /**
   * Send interview link.
   *
   * Send an interview link to the specified user for the given job.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sendInterviewLink$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendInterviewLink(params: SendInterviewLink$Params, context?: HttpContext): Observable<SimpleStatusDto> {
    return this.sendInterviewLink$Response(params, context).pipe(
      map((r: StrictHttpResponse<SimpleStatusDto>): SimpleStatusDto => r.body)
    );
  }

  /** Path part for operation `downloadJobPdf()` */
  static readonly DownloadJobPdfPath = '/api/jobs/{jobId}/pdf';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadJobPdf()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadJobPdf$Response(params: DownloadJobPdf$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
    return downloadJobPdf(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `downloadJobPdf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadJobPdf(params: DownloadJobPdf$Params, context?: HttpContext): Observable<Blob> {
    return this.downloadJobPdf$Response(params, context).pipe(
      map((r: StrictHttpResponse<Blob>): Blob => r.body)
    );
  }

}
