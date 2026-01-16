import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CxsButtonComponent, CxsThemeDirective, CxsThemeMode } from 'cerxos-ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CxsButtonComponent, CxsThemeDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  themeMode: CxsThemeMode = 'light';
  systemPrefersDark = false;

  private mediaQuery: MediaQueryList | null = null;
  private mediaListener: ((event: MediaQueryListEvent) => void) | null = null;

  ngOnInit(): void {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.systemPrefersDark = this.mediaQuery.matches;

    this.mediaListener = (event: MediaQueryListEvent) => {
      this.systemPrefersDark = event.matches;
    };

    if (typeof this.mediaQuery.addEventListener === 'function') {
      this.mediaQuery.addEventListener('change', this.mediaListener);
    } else if (typeof this.mediaQuery.addListener === 'function') {
      this.mediaQuery.addListener(this.mediaListener);
    }
  }

  ngOnDestroy(): void {
    if (!this.mediaQuery || !this.mediaListener) {
      return;
    }

    if (typeof this.mediaQuery.removeEventListener === 'function') {
      this.mediaQuery.removeEventListener('change', this.mediaListener);
    } else if (typeof this.mediaQuery.removeListener === 'function') {
      this.mediaQuery.removeListener(this.mediaListener);
    }
  }

  setTheme(mode: CxsThemeMode): void {
    this.themeMode = mode;
  }
}
