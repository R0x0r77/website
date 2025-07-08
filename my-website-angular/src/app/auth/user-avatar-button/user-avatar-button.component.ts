import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UserSettingsComponent } from '../user-settings/user-settings.component';

@Component({
  selector: 'app-user-avatar-button',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-avatar-button.component.html',
  styleUrl: './user-avatar-button.component.scss',
})
export class UserAvatarButtonComponent {
  constructor(
    private authService: AuthService,
    private readonly dialog: MatDialog
  ) {}

  onClickUserSettings() {
    this.dialog.open(UserSettingsComponent);
  }

  onClickLogOut() {
    this.authService.logOut();
  }
}
