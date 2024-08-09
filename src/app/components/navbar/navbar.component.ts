import { Component } from '@angular/core';
import { AuthService } from '../../modules/api-module/services';
import { AppConfig } from '../../config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isNavbarCollapsed = false;
  userRole: string = 'UNUSED';

  constructor(private authService: AuthService, private router: Router) {
    this.userRole = AppConfig.userRole;
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  isAdmin() {
    return this.authService.getUserRole() === 'ROLE_ADMIN';
  }

  visitProfile() {
    return this.authService.getUserRole() !== '' && this.authService.getUserRole() !== 'ROLE_ADMIN';

  }
  isLogged() {
    return this.authService.getUserRole() !== '';
  }

  logout() {
    AppConfig.token = '';
    AppConfig.userRole = '';
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getProfile() {
    if (this.authService.getUserRole() === 'ROLE_USER' ) {
      this.router.navigate(['/users', this.authService.getUserId()]);
    }
    if (this.authService.getUserRole() === 'ROLE_COMPANY' ) {
      this.router.navigate(['/companies', this.authService.getUserId()]);
    }
  }
}
