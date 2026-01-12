import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CxsAlertComponent,
  CxsBadgeComponent,
  CxsBreadcrumbComponent,
  CxsButtonComponent,
  CxsCheckboxComponent,
  CxsDatepickerComponent,
  CxsInputComponent,
  CxsRadioComponent,
  CxsSelectComponent,
  CxsThemeDirective,
  CxsThemeMode
} from 'cerxos-ui';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    CxsAlertComponent,
    CxsBadgeComponent,
    CxsBreadcrumbComponent,
    CxsButtonComponent,
    CxsCheckboxComponent,
    CxsDatepickerComponent,
    CxsInputComponent,
    CxsRadioComponent,
    CxsSelectComponent,
    CxsThemeDirective
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  themeMode: CxsThemeMode = 'light';
  systemPrefersDark = false;
  loginEmail = '';
  loginPassword = '';
  loginRegion = '';
  loginAccountType = 'personal';
  loginStartDate = '2024-03-10';
  loginRemember = true;
  loginAgree = false;
  loginBreadcrumbs = [
    { label: 'Cerxos', href: '#' },
    { label: 'Access', href: '#' },
    { label: 'Sign in' }
  ];
  breadcrumbs = [
    { label: 'Home', href: '#' },
    { label: 'Accounts', href: '#' },
    { label: 'Growth' }
  ];
  breadcrumbMuted = [
    { label: 'Workspace', href: '#' },
    { label: 'Settings' }
  ];
  tier = 'starter';
  newsletter = true;
  alerts = false;
  partial = true;
  selectedDate = '2024-04-01';
  customDate = '2024-03-10';

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
