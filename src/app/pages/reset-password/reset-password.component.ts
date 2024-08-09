import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../modules/api-module/services';
import { SuccessDialogService } from '../../success-dialog.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  message: string = '';
  token: string | null = null;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private successDialogService: SuccessDialogService,
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
      this.message = 'Invalid password reset token';
    }
  }

  onSubmit() {
    if (this.resetPasswordForm.valid && this.token) {
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;
      this.authService.resetPassword({token:this.token, newPassword: newPassword}).subscribe(
        response => {
          this.openSuccessDialog();
        },
        error => {
          console.error('Error:', error);
          this.message = 'There was an error resetting your password';
        }
      );
    }
  }

  openSuccessDialog(): void {
    this.successDialogService.showSuccess(
      'Reset Password Successful',
      'Your password has been reset successfully'
    ).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
