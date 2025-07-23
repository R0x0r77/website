import {
  afterNextRender,
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class NavbarComponent implements OnInit, AfterViewInit {
  menuButton = viewChild.required('myMenuButton', {
    read: ElementRef<HTMLButtonElement>,
  });
  authService = inject(AuthService);
  userStore = inject(UserStore);
  readonly loggedIn = this.userStore.loggedIn;
  mode = signal<'light' | 'dark'>('light');
  isPanelOpened = signal(false);

  constructor(
    private openClosePanelService: OpenClosePanelService,
    private destroyRef: DestroyRef
  ) {
    this.openClosePanelService.openedClosed$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.isPanelOpened.set(value));
  }

  switchDarkMode() {
    this.mode.set(this.mode() === 'dark' ? 'light' : 'dark');
  }

  onOpenCloseSidenav() {
    this.isPanelOpened.update((value) => !value);
    this.openClosePanelService.onOpenClose(this.isPanelOpened());
  }

  ngOnInit() {
    this.authService.init();
  }

  ngAfterViewInit() {
    setTimeout(() => this.menuButton().nativeElement.click(), 1000);
  }
}
