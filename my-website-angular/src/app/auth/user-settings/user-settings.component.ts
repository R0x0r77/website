import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserStore } from '../../../store/user.store';
import { AuthService, UserUpdateDto } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-user-settings',
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsComponent implements OnInit {
  userStore = inject(UserStore);

  constructor(
    public dialogRef: MatDialogRef<UserSettingsComponent>,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService
  ) {}

  userId = signal(this.userStore.user()?.userId);
  username = signal(this.userStore.user()?.username);
  email = signal(this.userStore.user()?.email);
  firstName = signal(this.userStore.user()?.firstName);
  lastName = signal(this.userStore.user()?.lastName);
  level = signal(this.userStore.user()?.level);

  fullName = signal<string | undefined>('');

  accessLevel = computed(() => {
    if (!this.level()) return 'counter_1';
    return this.level()! < 10 ? `counter_${this.level()}` : 'workspace_premium';
  });

  onSubmit() {
    const user: UserUpdateDto = {
      userId: this.userId()!,
      username: this.username()!,
      email: this.email()!,
      firstName: this.firstName(),
      lastName: this.lastName(),
    };

    this.authService.modify(user).subscribe({
      next: () => {
        this.notificationService.showSuccess('Data updated successfully');
        this.dialogRef.close();
      },
      error: (error) => {
        this.notificationService.showError(error);
      },
    });
  }

  ngOnInit() {
    this.fullName.set(
      this.firstName()
        ? `${this.firstName()} ${this.lastName()}`
        : this.username()
    );
  }
}
