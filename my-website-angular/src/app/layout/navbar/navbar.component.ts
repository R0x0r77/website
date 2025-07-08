import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignUpComponent } from '../../auth/sign-up/sign-up.component';
import { LogInComponent } from '../../auth/log-in/log-in.component';
import { DarkModeSwitcherComponent } from '../../shared/dark-mode-switcher/dark-mode-switcher.component';
import { LogoHomeButtonComponent } from '../../shared/logo-home-button/logo-home-button.component';
import { UserStore } from '../../../store/user.store';
import { UserAvatarButtonComponent } from '../../auth/user-avatar-button/user-avatar-button.component';
import { AuthService } from '../../auth/auth.service';
import { OpenClosePanelService } from '../side-navigation/open-close-panel.service';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    SignUpComponent,
    LogInComponent,
    DarkModeSwitcherComponent,
    LogoHomeButtonComponent,
    UserAvatarButtonComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  userStore = inject(UserStore);
  openCloseService = inject(OpenClosePanelService);
  readonly loggedIn = this.userStore.loggedIn;
  mode = signal<'light' | 'dark'>('light');
  isPanelOpened = true;

  constructor() {}

  switchDarkMode() {
    this.mode.set(this.mode() === 'dark' ? 'light' : 'dark');
  }

  onOpenCloseSidenav() {
    this.isPanelOpened = !this.isPanelOpened;
    this.openCloseService.onOpenClose(this.isPanelOpened);
  }

  ngOnInit() {
    this.authService.init();
  }
}
