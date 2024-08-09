import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './modules/api-module/services';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authService.isAuthenticated();
    const userRole = this.authService.getUserRole();
    const userId = this.authService.getUserId();
    const routeId = route.paramMap.get('id');

    if (isAuthenticated && (userRole === 'ROLE_ADMIN' || (userRole === 'ROLE_COMPANY' && userId === routeId))) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
