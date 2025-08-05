import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showError(error: HttpErrorResponse, duration: number = 15000) {
    this.snackBar.open(
      'Error: ' + error.error?.message || error.message,
      'OK',
      {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: duration,
      }
    );
  }

  showSuccess(message: string, duration: number = 5000) {
    this.snackBar.open(message, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: duration,
    });
  }
}
