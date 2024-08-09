import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registration-success-dialog',
  templateUrl: './registration-success-dialog.component.html',
  styleUrl: './registration-success-dialog.component.scss'
})
export class RegistrationSuccessDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RegistrationSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
