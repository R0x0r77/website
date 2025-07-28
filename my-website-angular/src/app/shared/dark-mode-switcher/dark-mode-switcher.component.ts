import { Component, effect, input, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ThemeService } from './theme.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dark-mode-switcher',
  imports: [
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './dark-mode-switcher.component.html',
  styleUrl: './dark-mode-switcher.component.scss',
})
export class DarkModeSwitcherComponent {
  mode = input<'light' | 'dark'>();
  fontIcon = signal<string>('dark_mode');

  constructor(private themeService: ThemeService) {
    effect(() => {
      this.themeService.setTheme(
        this.mode() === 'dark' ? 'magenta-violet' : 'azure-blue'
      );
      if (this.mode() === 'dark') this.themeService.enableDarkMode();
      else this.themeService.disableDarkMode();
    });
  }
}
