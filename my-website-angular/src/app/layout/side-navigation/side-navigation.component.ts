import { Component, DestroyRef } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { OpenClosePanelService } from './open-close-panel.service';

interface SideNavigationItem {
  label: string;
  icon: string;
  route: string;
}
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
  items: SideNavigationItem[] = [
    { label: 'Home', icon: 'home', route: '/' },
    { label: 'About', icon: 'contact_page', route: '/about' },
    { label: 'Skills', icon: 'fitness_center', route: '/skills' },
    { label: 'CV', icon: 'assignment', route: '/cv' },
    { label: 'Technologies', icon: 'desktop_windows', route: '/technologies' },
    { label: 'Board Games', icon: 'rocket', route: '/boardgames' },
    { label: 'Riddles', icon: 'psychology_alt', route: '/riddles' },
    { label: 'Contact', icon: 'mail', route: '/contact' },
  ];

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
