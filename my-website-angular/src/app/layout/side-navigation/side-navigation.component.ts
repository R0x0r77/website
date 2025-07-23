import { Component, DestroyRef } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { OpenClosePanelService } from './open-close-panel.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-side-navigation',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss',
})
export class SideNavigationComponent {
  constructor(private openClosePanelService: OpenClosePanelService) {}

  isSmallScreen(): boolean {
    return window.matchMedia('(max-width: 640px)').matches; // Tailwind `sm` breakpoint
  }

  onRouteSelect() {
    if (this.isSmallScreen()) {
      this.openClosePanelService.onOpenClose(false);
    }
  }
}
