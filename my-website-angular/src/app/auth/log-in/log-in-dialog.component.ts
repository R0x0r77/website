import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthenticationRequest, AuthService } from '../auth.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-log-in-dialog',
  templateUrl: 'log-in-dialog.component.html',
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogInDialogComponent {
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  loading = signal(false);

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<LogInDialogComponent>,
    private notificationService: NotificationService
  ) {}

  onSubmit() {
    this.loading.set(true);
    const request: AuthenticationRequest = {
      username: this.usernameFormControl.value!,
      password: this.passwordFormControl.value!,
    };
    this.authService.logIn(request).subscribe({
      next: () => {
        this.notificationService.showSuccess('Logged in successfully');
        this.dialogRef.close();
      },
      error: (error) => {
        this.notificationService.showError(error);
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
