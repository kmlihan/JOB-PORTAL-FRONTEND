import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/api-module/services';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.authService.setToken();
    const authToken = this.authService.getToken();


    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` }
    });


    return next.handle(authReq);
  }
}
