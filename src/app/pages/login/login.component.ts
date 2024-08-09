import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/api-module/services';
import { JwtAuthenticationResponse, LoginRequest } from '../../modules/api-module/models';
import { AppConfig } from '../../config';
import { ErrorHandlerService } from '../../error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData: LoginRequest = { email: '', password: '' };
  userRole: string = '';
  tokenData: any;
  constructor(
    private authService: AuthService,
     private router: Router,
     private errorHandler: ErrorHandlerService 
    ) {
    
   }

  onSubmit() {
    this.authService.login({body : this.loginData}).subscribe(
      (response : JwtAuthenticationResponse) => {
        this.tokenData = this.authService.decodeToken(response.token!);
        localStorage.removeItem('token');
        localStorage.setItem('token', response.token!);
        this.router.navigate(['/jobs']);
      },
      error => {
        console.error('Login failed', error);
        this.errorHandler.showError('Email or password incorrect');
      }
    );
  }
}
