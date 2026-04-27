import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsThemeDirective, CxsThemeMode } from './theme.directive';

describe('CxsThemeDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsThemeDirective],
    template: `
      <div [cxsTheme]="mode"></div>
    `
  })
  class TestHostComponent {
    mode: CxsThemeMode = 'light';
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('applies dark class when mode is dark', () => {
    const element = fixture.nativeElement.querySelector('div') as HTMLElement;
    fixture.componentInstance.mode = 'dark';
    fixture.detectChanges();

    expect(element.classList.contains('cxs-theme-dark')).toBeTrue();
  });

  it('removes dark class when mode is light', () => {
    const element = fixture.nativeElement.querySelector('div') as HTMLElement;
    fixture.componentInstance.mode = 'dark';
    fixture.detectChanges();

    fixture.componentInstance.mode = 'light';
    fixture.detectChanges();

    expect(element.classList.contains('cxs-theme-dark')).toBeFalse();
  });

  it('follows system preference when mode is system', () => {
    const element = fixture.nativeElement.querySelector('div') as HTMLElement;
    const callbacks: { listener?: (event: MediaQueryListEvent) => void } = {};
    const mediaQueryState = { matches: false };

    const mediaQuery = {
      get matches() {
        return mediaQueryState.matches;
      },
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: (_: string, cb: (event: MediaQueryListEvent) => void) => {
        callbacks.listener = cb;
      },
      removeEventListener: () => {},
      dispatchEvent: () => true
    } as unknown as MediaQueryList;

    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: () => mediaQuery
    });

    fixture.componentInstance.mode = 'system';
    fixture.detectChanges();

    expect(element.classList.contains('cxs-theme-dark')).toBeFalse();

    mediaQueryState.matches = true;
    const onPreferenceChange = callbacks.listener;

    if (!onPreferenceChange) {
      fail('Expected matchMedia listener to be registered.');
      return;
    }

    onPreferenceChange({ matches: true } as MediaQueryListEvent);

    expect(element.classList.contains('cxs-theme-dark')).toBeTrue();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: originalMatchMedia
    });
  });
});
