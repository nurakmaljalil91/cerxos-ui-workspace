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
    let listener: ((event: MediaQueryListEvent) => void) | null = null;

    const mediaQuery = {
      matches: false,
      addEventListener: (_: string, cb: (event: MediaQueryListEvent) => void) => {
        listener = cb;
      },
      removeEventListener: () => {}
    } as MediaQueryList;

    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: () => mediaQuery
    });

    fixture.componentInstance.mode = 'system';
    fixture.detectChanges();

    expect(element.classList.contains('cxs-theme-dark')).toBeFalse();

    mediaQuery.matches = true;
    listener?.({ matches: true } as MediaQueryListEvent);

    expect(element.classList.contains('cxs-theme-dark')).toBeTrue();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: originalMatchMedia
    });
  });
});
