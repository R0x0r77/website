import { Component, DestroyRef, model } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { SideNavigationComponent } from './layout/side-navigation/side-navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { OpenClosePanelService } from './layout/side-navigation/open-close-panel.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieBannerComponent } from './shared/cookie-banner/cookie-banner.component';

@Component({
  selector: 'app-root',
  imports: [
    MatSlideToggleModule,
    NavbarComponent,
    FooterComponent,
    SideNavigationComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterOutlet,
    CookieBannerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'my-website-angular';
  sidenavOpened = model(false);
  icons = ['github', 'linkedin'];

  constructor(
    private openClosePanelService: OpenClosePanelService,
    private destroyRef: DestroyRef,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.openClosePanelService.openedClosed$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.sidenavOpened.set(value));

    this.icons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/${icon}.svg`
        )
      );
    });
  }
}
