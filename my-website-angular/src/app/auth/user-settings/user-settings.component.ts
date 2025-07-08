import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserStore } from '../../../store/user.store';

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
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsComponent {
  userStore = inject(UserStore);

  constructor(public dialogRef: MatDialogRef<UserSettingsComponent>) {}

  username = signal(this.userStore.user()?.username);
  email = signal(this.userStore.user()?.email);
  firstName = signal(this.userStore.user()?.firstName);
  lastName = signal(this.userStore.user()?.lastName);

  fullName = computed<string | undefined>(() =>
    this.firstName()
      ? `${this.firstName()} ${this.lastName()}`
      : this.username()
  );
}
