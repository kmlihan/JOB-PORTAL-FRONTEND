/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { applyToJob } from '../fn/user-service/apply-to-job';
import { ApplyToJob$Params } from '../fn/user-service/apply-to-job';
import { deleteUser } from '../fn/user-service/delete-user';
import { DeleteUser$Params } from '../fn/user-service/delete-user';
import { getAllUsers } from '../fn/user-service/get-all-users';
import { GetAllUsers$Params } from '../fn/user-service/get-all-users';
import { getAppliedJobsForUser } from '../fn/user-service/get-applied-jobs-for-user';
import { GetAppliedJobsForUser$Params } from '../fn/user-service/get-applied-jobs-for-user';
import { getUserById } from '../fn/user-service/get-user-by-id';
import { GetUserById$Params } from '../fn/user-service/get-user-by-id';
import { JobDto } from '../models/job-dto';
import { Page } from '../models/page';
import { SimpleStatusDto } from '../models/simple-status-dto';
import { updateUser } from '../fn/user-service/update-user';
import { UpdateUser$Params } from '../fn/user-service/update-user';
import { uploadCv } from '../fn/user-service/upload-cv';
import { UploadCv$Params } from '../fn/user-service/upload-cv';
import { uploadProfilePicture } from '../fn/user-service/upload-profile-picture';
import { UploadProfilePicture$Params } from '../fn/user-service/upload-profile-picture';
import { UserDto } from '../models/user-dto';


/**
 * UserService
 */
@Injectable({ providedIn: 'root' })
export class UserService  extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getUserById()` */
  static readonly GetUserByIdPath = '/api/users/{id}';

  /**
   * Get user by id.
   *
   * Get user by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Response(params: GetUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return getUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get user by id.
   *
   * Get user by id.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById(params: GetUserById$Params, context?: HttpContext): Observable<UserDto> {
    return this.getUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `updateUser()` */
  static readonly UpdateUserPath = '/api/users/{id}';

  /**
   * Update user by id.
   *
   * Update user by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser$Response(params: UpdateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return updateUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Update user by id.
   *
   * Update user by id.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser(params: UpdateUser$Params, context?: HttpContext): Observable<UserDto> {
    return this.updateUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `deleteUser()` */
  static readonly DeleteUserPath = '/api/users/{id}';

  /**
   * Delete user by id.
   *
   * Delete user by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Response(params: DeleteUser$Params, context?: HttpContext): Observable<StrictHttpResponse<SimpleStatusDto>> {
    return deleteUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete user by id.
   *
   * Delete user by id.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params: DeleteUser$Params, context?: HttpContext): Observable<SimpleStatusDto> {
    return this.deleteUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<SimpleStatusDto>): SimpleStatusDto => r.body)
    );
  }

  /** Path part for operation `getAllUsers()` */
  static readonly GetAllUsersPath = '/api/users';

  /**
   * Get all users.
   *
   * List all users.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getAllUsers$Response(params: GetAllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<Page>> {
    return getAllUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all users.
   *
   * List all users.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getAllUsers(params: GetAllUsers$Params, context?: HttpContext): Observable<Page> {
    return this.getAllUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Page>): Page => r.body)
    );
  }

  /** Path part for operation `uploadProfilePicture()` */
  static readonly UploadProfilePicturePath = '/api/users/{userId}/profilePicture';

  /**
   * Upload profile picture to  user.
   *
   * Upload profile picture to  user.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadProfilePicture()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProfilePicture$Response(params: UploadProfilePicture$Params, context?: HttpContext): Observable<StrictHttpResponse<SimpleStatusDto>> {
    return uploadProfilePicture(this.http, this.rootUrl, params, context);
  }

  /**
   * Upload profile picture to  user.
   *
   * Upload profile picture to  user.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadProfilePicture$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProfilePicture(params: UploadProfilePicture$Params, context?: HttpContext): Observable<SimpleStatusDto> {
    return this.uploadProfilePicture$Response(params, context).pipe(
      map((r: StrictHttpResponse<SimpleStatusDto>): SimpleStatusDto => r.body)
    );
  }

  /** Path part for operation `uploadCv()` */
  static readonly UploadCvPath = '/api/users/{userId}/cv';

  /**
   * Upload cv to  user.
   *
   * Upload cv to  user.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadCv()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadCv$Response(params: UploadCv$Params, context?: HttpContext): Observable<StrictHttpResponse<SimpleStatusDto>> {
    return uploadCv(this.http, this.rootUrl, params, context);
  }

  /**
   * Upload cv to  user.
   *
   * Upload cv to  user.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadCv$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadCv(params: UploadCv$Params, context?: HttpContext): Observable<SimpleStatusDto> {
    return this.uploadCv$Response(params, context).pipe(
      map((r: StrictHttpResponse<SimpleStatusDto>): SimpleStatusDto => r.body)
    );
  }

  /** Path part for operation `applyToJob()` */
  static readonly ApplyToJobPath = '/api/users/apply/{userId}/{jobId}';

  /**
   * Apply to job.
   *
   * Apply to job.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `applyToJob()` instead.
   *
   * This method doesn't expect any request body.
   */
  applyToJob$Response(params: ApplyToJob$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return applyToJob(this.http, this.rootUrl, params, context);
  }

  /**
   * Apply to job.
   *
   * Apply to job.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `applyToJob$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  applyToJob(params: ApplyToJob$Params, context?: HttpContext): Observable<UserDto> {
    return this.applyToJob$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `getAppliedJobsForUser()` */
  static readonly GetAppliedJobsForUserPath = '/api/users/{userId}/applied-jobs';

  /**
   * Get applied jobs for user.
   *
   * Get applied jobs for user.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAppliedJobsForUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAppliedJobsForUser$Response(params: GetAppliedJobsForUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<JobDto>>> {
    return getAppliedJobsForUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Get applied jobs for user.
   *
   * Get applied jobs for user.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAppliedJobsForUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAppliedJobsForUser(params: GetAppliedJobsForUser$Params, context?: HttpContext): Observable<Array<JobDto>> {
    return this.getAppliedJobsForUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<JobDto>>): Array<JobDto> => r.body)
    );
  }

}
