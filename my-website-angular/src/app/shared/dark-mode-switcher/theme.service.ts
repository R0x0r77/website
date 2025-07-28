import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeLinkId = 'app-theme';
  private darkClass = 'dark';

  private themes = ['azure-blue', 'magenta-violet'];

  constructor(private overlay: OverlayContainer) {}

  isDarkMode(): boolean {
    return document.documentElement.classList.contains(this.darkClass);
  }

  enableDarkMode(): void {
    document.documentElement.classList.add(this.darkClass);
  }

  disableDarkMode(): void {
    document.documentElement.classList.remove(this.darkClass);
  }

  toggleDarkMode(): void {
    document.documentElement.classList.toggle(this.darkClass);
  }

  setTheme(themeName: string) {
    const head = document.head;
    const existingLink = document.getElementById(
      this.themeLinkId
    ) as HTMLLinkElement;

    const href = `assets/my-material-themes/${themeName}.css`;

    if (existingLink) {
      existingLink.href = href;
    } else {
      const linkEl = document.createElement('link');
      linkEl.id = this.themeLinkId;
      linkEl.rel = 'stylesheet';
      linkEl.href = href;
      head.appendChild(linkEl);
    }

    document.body.classList.remove(...this.themes);
    document.body.classList.add(themeName);

    const containerClassList = this.overlay.getContainerElement().classList;
    containerClassList.remove(...this.themes);
    containerClassList.add(themeName);
  }
}
