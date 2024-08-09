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
import { CompanyDto } from '../models/company-dto';
import { forgotPassword } from '../fn/auth-service/forgot-password';
import { ForgotPassword$Params } from '../fn/auth-service/forgot-password';
import { JwtAuthenticationResponse } from '../models/jwt-authentication-response';
import { login } from '../fn/auth-service/login';
import { Login$Params } from '../fn/auth-service/login';
import { registerAdmin } from '../fn/auth-service/register-admin';
import { RegisterAdmin$Params } from '../fn/auth-service/register-admin';
import { registerCompany } from '../fn/auth-service/register-company';
import { RegisterCompany$Params } from '../fn/auth-service/register-company';
import { registerUser } from '../fn/auth-service/register-user';
import { RegisterUser$Params } from '../fn/auth-service/register-user';
import { resetPassword } from '../fn/auth-service/reset-password';
import { ResetPassword$Params } from '../fn/auth-service/reset-password';
import { SimpleStatusDto } from '../models/simple-status-dto';
import { UserDto } from '../models/user-dto';


/**
 * AuthService
 */
@Injectable({ providedIn: 'root' })
export class AuthService  extends BaseService {

  tokenKey: string = 'token';
  token: string | null = null;
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `resetPassword()` */
  static readonly ResetPasswordPath = '/api/auth/reset-password';

  /**
   * Reset Password.
   *
   * Complete password reset process
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resetPassword()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword$Response(params: ResetPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<SimpleStatusDto>> {
    return resetPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * Reset Password.
   *
   * Complete password reset process
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resetPassword$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword(params: ResetPassword$Params, context?: HttpContext): Observable<SimpleStatusDto> {
    return this.resetPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<SimpleStatusDto>): SimpleStatusDto => r.body)
    );
  }

  /** Path part for operation `registerUser()` */
  static readonly RegisterUserPath = '/api/auth/register/user';

  /**
   * Register user.
   *
   * Register user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerUser$Response(params: RegisterUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return registerUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Register user.
   *
   * Register user
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerUser(params: RegisterUser$Params, context?: HttpContext): Observable<UserDto> {
    return this.registerUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `registerCompany()` */
  static readonly RegisterCompanyPath = '/api/auth/register/company';

  /**
   * Register company.
   *
   * Register company
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerCompany()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerCompany$Response(params: RegisterCompany$Params, context?: HttpContext): Observable<StrictHttpResponse<CompanyDto>> {
    return registerCompany(this.http, this.rootUrl, params, context);
  }

  /**
   * Register company.
   *
   * Register company
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerCompany$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerCompany(params: RegisterCompany$Params, context?: HttpContext): Observable<CompanyDto> {
    return this.registerCompany$Response(params, context).pipe(
      map((r: StrictHttpResponse<CompanyDto>): CompanyDto => r.body)
    );
  }

  /** Path part for operation `registerAdmin()` */
  static readonly RegisterAdminPath = '/api/auth/register/admin';

  /**
   * Register admin.
   *
   * Register admin
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerAdmin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerAdmin$Response(params: RegisterAdmin$Params, context?: HttpContext): Observable<StrictHttpResponse<AdminDto>> {
    return registerAdmin(this.http, this.rootUrl, params, context);
  }

  /**
   * Register admin.
   *
   * Register admin
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerAdmin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerAdmin(params: RegisterAdmin$Params, context?: HttpContext): Observable<AdminDto> {
    return this.registerAdmin$Response(params, context).pipe(
      map((r: StrictHttpResponse<AdminDto>): AdminDto => r.body)
    );
  }

  /** Path part for operation `login()` */
  static readonly LoginPath = '/api/auth/login';

  /**
   * login.
   *
   * login
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: Login$Params, context?: HttpContext): Observable<StrictHttpResponse<JwtAuthenticationResponse>> {
    return login(this.http, this.rootUrl, params, context);
  }

  /**
   * login.
   *
   * login
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: Login$Params, context?: HttpContext): Observable<JwtAuthenticationResponse> {
    return this.login$Response(params, context).pipe(
      map((r: StrictHttpResponse<JwtAuthenticationResponse>): JwtAuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `forgotPassword()` */
  static readonly ForgotPasswordPath = '/api/auth/forgot-password';

  /**
   * Forgot Password.
   *
   * Initiate password reset process
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgotPassword()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword$Response(params: ForgotPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<SimpleStatusDto>> {
    return forgotPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * Forgot Password.
   *
   * Initiate password reset process
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `forgotPassword$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword(params: ForgotPassword$Params, context?: HttpContext): Observable<SimpleStatusDto> {
    return this.forgotPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<SimpleStatusDto>): SimpleStatusDto => r.body)
    );
  }

  // Method to decode token and get data
  decodeToken(token: string): any {
    try {
      return this.jwtDecode(token);  
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  
  // Method to get specific data from token
  getTokenData(token: string, key: string): any {
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken[key] : null;
  }
  
  // Method to check if the token is expired
  isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken) {
      return true;
    }
    const currentTime = Math.floor(new Date().getTime() / 1000);
    return decodedToken.exp < currentTime;
  }
  
  
   jwtDecode(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }
    
    const payload = parts[1];
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    
    try {
      return JSON.parse(decodedPayload);
    } catch (e) {
      throw new Error('Invalid JWT payload');
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token && !this.isTokenExpired(token);
  }

 
  getUserRole(): string {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decoded: any = this.jwtDecode(token);
      return decoded.role;
    }
    return '';
  }
  getUserId(): string {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decoded: any = this.jwtDecode(token);
      return decoded.id;
    }
    return '';
  }

  setToken(): void {
    this.token= localStorage.getItem('token');
    
  }

  // Retrieve the token when needed
  getToken(): string | null {
    return this.token;
  }

  // Clear the token on logout
  clearToken(): void {
    this.token = null;
  }
}
