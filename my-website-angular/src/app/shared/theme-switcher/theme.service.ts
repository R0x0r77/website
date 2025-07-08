import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeLinkId = 'app-theme';

  private themes = [
    'azure-blue',
    'cyan-orange',
    'indigo-pink',
    'deeppurple-amber',
    'pink-bluegrey',
    'purple-green',
    'magenta-violet',
    'rose-red',
  ];

  constructor(private overlay: OverlayContainer) {}

  setTheme(themeName: string) {
    if (!this.themes.includes(themeName)) {
      console.warn(`Theme ${themeName} is not recognized.`);
      return;
    }

    const head = document.head;
    const existingLink = document.getElementById(
      this.themeLinkId
    ) as HTMLLinkElement;

    const href = `assets/material-themes/${themeName}.css`;

    if (existingLink) {
      existingLink.href = href;
    } else {
      const linkEl = document.createElement('link');
      linkEl.id = this.themeLinkId;
      linkEl.rel = 'stylesheet';
      linkEl.href = href;
      head.appendChild(linkEl);
    }

    // Update body classes
    document.body.classList.remove(...this.themes);
    document.body.classList.add(themeName);

    // Add mat-typography for proper text colors
    // document.body.classList.add('mat-typography');
    // document.body.classList.add('mat-app-background');

    // Also update Angular Material overlay container (dialogs, menus, etc.)
    const containerClassList = this.overlay.getContainerElement().classList;
    containerClassList.remove(...this.themes);
    containerClassList.add(themeName);
  }
}
