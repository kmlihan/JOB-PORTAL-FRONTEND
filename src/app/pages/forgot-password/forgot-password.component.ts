import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../modules/api-module/services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  message: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      this.authService.forgotPassword({email: email}).subscribe(
        response => {
          this.message = 'Password reset link has been sent to your email';
        },
        error => {
          console.error('Error:', error.error.message);
          this.errorMessage = error.error.message;
        }
      );
    }
  }
}
