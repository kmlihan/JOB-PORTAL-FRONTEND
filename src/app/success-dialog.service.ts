import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RegistrationSuccessDialogComponent } from './components/registration-success-dialog/registration-success-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class SuccessDialogService {

  constructor(private dialog: MatDialog) {}

  showSuccess(title: string, message: string): Observable<void> {
    const dialogRef = this.dialog.open(RegistrationSuccessDialogComponent, {
      width: '600px',
      data: { title: title, message: message },
      disableClose: true, 
   
    });

    return dialogRef.afterClosed();
  }
}
