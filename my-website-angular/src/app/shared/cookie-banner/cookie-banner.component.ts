import { Component } from '@angular/core';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-cookie-banner',
  imports: [],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.scss',
})
export class CookieBannerComponent {
  showCookieBanner = !Cookies.get('cookieConsent');

  dismissCookieBanner() {
    Cookies.set('cookieConsent', 'true', { expires: 365 });
    this.showCookieBanner = false;
  }
}
