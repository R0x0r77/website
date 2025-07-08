import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  imports: [
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
  ],
})
export class ThemeSwitcherComponent implements OnInit {
  themes = [
    { name: 'Azure/Blue', value: 'azure-blue' },
    { name: 'Cyan/Orange', value: 'cyan-orange' },
    { name: 'Magenta/Violet', value: 'magenta-violet' },
    { name: 'Rose/Red', value: 'rose-red' },
    { name: 'Indigo/Pink', value: 'indigo-pink' },
    { name: 'Deep Purple/Amber', value: 'deeppurple-amber' },
    { name: 'Pink/Blue Grey', value: 'pink-bluegrey' },
    { name: 'Purple/Green', value: 'purple-green' },
  ];

  constructor(private themeService: ThemeService) {}

  onThemeChange(theme: string) {
    this.themeService.setTheme(theme);
  }

  ngOnInit(): void {
    this.themeService.setTheme('azure-blue');
  }
}
