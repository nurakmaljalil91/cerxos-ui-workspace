import { TestBed } from '@angular/core/testing';

import {
  CXS_USER_SESSION_STORAGE_KEY,
  CxsPreferenceFormattingService
} from './preference-formatting.service';

describe('CxsPreferenceFormattingService', () => {
  let service: CxsPreferenceFormattingService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CxsPreferenceFormattingService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('formats API dates using the selected date preference', () => {
    setSessionPreferences([{ key: 'ui.dateFormat', value: 'dmy' }]);

    expect(service.formatDate('2026-05-01')).toBe('01/05/2026');
  });

  it('keeps API date values stable for ymd preference', () => {
    setSessionPreferences([{ key: 'ui.dateFormat', value: 'ymd' }]);

    expect(service.formatDate('2026-05-01')).toBe('2026-05-01');
  });

  it('formats currency using the selected currency preference', () => {
    setSessionPreferences([{ key: 'ui.currencyFormat', value: 'myr' }]);

    expect(service.formatCurrency(1234.56)).toBe('RM 1,234.56');
  });

  function setSessionPreferences(preferences: Array<{ key: string; value: string }>): void {
    localStorage.setItem(CXS_USER_SESSION_STORAGE_KEY, JSON.stringify({ preferences }));
  }
});
