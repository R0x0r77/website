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
import { MyErrorStateMatcher } from '../../shared/input/my-error-state-matcher';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import User from '../../data/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: 'sign-up-dialog.component.html',
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
export class SignUpDialogComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  firstNameFormControl = new FormControl('');
  lastNameFormControl = new FormControl('');
  matcher = new MyErrorStateMatcher();

  loading = signal(false);

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<SignUpDialogComponent>,
    private snackBar: MatSnackBar
  ) {}

  showError(error: Error) {
    this.snackBar.open('Error: ' + error.message, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 15000,
    });
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
    });
  }

  createUser() {
    return new User(
      undefined,
      this.usernameFormControl.value!,
      this.emailFormControl.value!,
      this.firstNameFormControl.value!,
      this.lastNameFormControl.value!,
      undefined,
      new Date(),
      new Date(),
      this.passwordFormControl.value!
    );
  }

  onSubmit() {
    this.loading.set(true);
    const user = this.createUser();
    this.authService.signUp(user).subscribe({
      next: () => {
        this.showSuccess('User signed up successfully');
        this.dialogRef.close();
      },
      error: (error) => {
        this.showError(error);
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
