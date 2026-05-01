import { Injectable, signal } from '@angular/core';

export type CxsDateFormatPreference = 'mdy' | 'dmy' | 'ymd';
export type CxsCurrencyFormatPreference = 'usd' | 'myr' | 'eur' | 'gbp' | 'jpy';

type UserPreference = {
  key?: string;
  value?: string;
};

type UserSession = {
  preferences?: UserPreference[];
};

type CurrencyFormatConfig = {
  currency: string;
  locale: string;
};

export const CXS_USER_SESSION_STORAGE_KEY = 'user_session';
export const CXS_USER_PREFERENCE_CHANGED_EVENT = 'cxs:user-preference-changed';

const DATE_FORMAT_PREFERENCE_KEY = 'ui.dateFormat';
const CURRENCY_FORMAT_PREFERENCE_KEY = 'ui.currencyFormat';

const DATE_FORMAT_ALIASES = ['dateFormat', 'date_format'];
const CURRENCY_FORMAT_ALIASES = ['currencyFormat', 'currency_format', 'currency'];

const DEFAULT_DATE_FORMAT: CxsDateFormatPreference = 'mdy';
const DEFAULT_CURRENCY_FORMAT: CxsCurrencyFormatPreference = 'usd';

const CURRENCY_FORMATS: Record<CxsCurrencyFormatPreference, CurrencyFormatConfig> = {
  usd: { currency: 'USD', locale: 'en-US' },
  myr: { currency: 'MYR', locale: 'en-MY' },
  eur: { currency: 'EUR', locale: 'en-IE' },
  gbp: { currency: 'GBP', locale: 'en-GB' },
  jpy: { currency: 'JPY', locale: 'ja-JP' }
};

@Injectable({
  providedIn: 'root'
})
export class CxsPreferenceFormattingService {
  private readonly preferenceVersionSignal = signal(0);
  readonly preferenceVersion = this.preferenceVersionSignal.asReadonly();

  constructor() {
    this.addPreferenceListeners();
  }

  formatDate(value: string | Date | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const date = value instanceof Date ? value : this.parseDateString(value);
    if (!date) {
      return String(value);
    }

    const format = this.dateFormatPreference();
    const year = date.getFullYear();
    const month = this.padDatePart(date.getMonth() + 1);
    const day = this.padDatePart(date.getDate());

    if (format === 'dmy') {
      return `${day}/${month}/${year}`;
    }

    if (format === 'ymd') {
      return `${year}-${month}-${day}`;
    }

    return `${month}/${day}/${year}`;
  }

  formatCurrency(value: string | number | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const amount = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(amount)) {
      return String(value);
    }

    const config = CURRENCY_FORMATS[this.currencyFormatPreference()];
    return new Intl.NumberFormat(config.locale, {
      currency: config.currency,
      style: 'currency'
    }).format(amount);
  }

  private dateFormatPreference(): CxsDateFormatPreference {
    const value = this.getPreference(DATE_FORMAT_PREFERENCE_KEY, DATE_FORMAT_ALIASES);
    return this.isDateFormatPreference(value) ? value : DEFAULT_DATE_FORMAT;
  }

  private currencyFormatPreference(): CxsCurrencyFormatPreference {
    const value = this.getPreference(CURRENCY_FORMAT_PREFERENCE_KEY, CURRENCY_FORMAT_ALIASES);
    return this.isCurrencyFormatPreference(value) ? value : DEFAULT_CURRENCY_FORMAT;
  }

  private getPreference(key: string, aliases: string[]): string | undefined {
    const preferences = this.readSession()?.preferences ?? [];
    const keys = [key, ...aliases];
    const preference = keys
      .map((preferenceKey) => preferences.find((item) => item.key === preferenceKey))
      .find(Boolean);

    return preference?.value?.trim().toLowerCase();
  }

  private readSession(): UserSession | null {
    const storage = this.getLocalStorage();
    if (!storage) {
      return null;
    }

    const raw = storage.getItem(CXS_USER_SESSION_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as UserSession;
    } catch {
      return null;
    }
  }

  private parseDateString(value: string): Date | null {
    const apiDateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (apiDateMatch) {
      const [, year, month, day] = apiDateMatch;
      return new Date(Number(year), Number(month) - 1, Number(day));
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  private padDatePart(value: number): string {
    return String(value).padStart(2, '0');
  }

  private isDateFormatPreference(value: string | undefined): value is CxsDateFormatPreference {
    return value === 'mdy' || value === 'dmy' || value === 'ymd';
  }

  private isCurrencyFormatPreference(
    value: string | undefined
  ): value is CxsCurrencyFormatPreference {
    return (
      value === 'usd' ||
      value === 'myr' ||
      value === 'eur' ||
      value === 'gbp' ||
      value === 'jpy'
    );
  }

  private addPreferenceListeners(): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('storage', (event) => {
      if (event.key === CXS_USER_SESSION_STORAGE_KEY) {
        this.bumpPreferenceVersion();
      }
    });

    window.addEventListener(CXS_USER_PREFERENCE_CHANGED_EVENT, () => {
      this.bumpPreferenceVersion();
    });
  }

  private bumpPreferenceVersion(): void {
    this.preferenceVersionSignal.update((version) => version + 1);
  }

  private getLocalStorage(): Storage | null {
    return typeof localStorage === 'undefined' ? null : localStorage;
  }
}
