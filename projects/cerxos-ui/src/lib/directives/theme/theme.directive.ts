import { Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';

export type CxsThemeMode = 'light' | 'dark' | 'system';

const DEFAULT_DARK_CLASS = 'cxs-theme-dark';

@Directive({
  selector: '[cxsTheme]',
  standalone: true
})
export class CxsThemeDirective implements OnDestroy {
  private mode: CxsThemeMode = 'light';
  private darkClass = DEFAULT_DARK_CLASS;
  private mediaQuery: MediaQueryList | null = null;
  private mediaListener: ((event: MediaQueryListEvent) => void) | null = null;

  constructor(
    private readonly host: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {}

  @Input()
  set cxsTheme(value: CxsThemeMode | null | undefined) {
    this.mode = value ?? 'light';
    this.applyTheme();
  }

  @Input()
  set cxsThemeDarkClass(value: string | null | undefined) {
    const nextClass = value?.trim() || DEFAULT_DARK_CLASS;
    if (nextClass === this.darkClass) {
      return;
    }

    const previousClass = this.darkClass;
    this.darkClass = nextClass;
    this.renderer.removeClass(this.host.nativeElement, previousClass);
    this.applyTheme();
  }

  ngOnDestroy(): void {
    this.detachMediaListener();
  }

  private applyTheme(): void {
    if (this.mode === 'system') {
      this.attachMediaListener();
    } else {
      this.detachMediaListener();
    }

    const shouldEnableDark =
      this.mode === 'dark' || (this.mode === 'system' && this.prefersDark());

    if (shouldEnableDark) {
      this.renderer.addClass(this.host.nativeElement, this.darkClass);
    } else {
      this.renderer.removeClass(this.host.nativeElement, this.darkClass);
    }
  }

  private prefersDark(): boolean {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }

    if (!this.mediaQuery) {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    }

    return this.mediaQuery.matches;
  }

  private attachMediaListener(): void {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    if (!this.mediaQuery) {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    }

    if (this.mediaListener) {
      return;
    }

    this.mediaListener = () => this.applyTheme();

    if (typeof this.mediaQuery.addEventListener === 'function') {
      this.mediaQuery.addEventListener('change', this.mediaListener);
    } else if (typeof this.mediaQuery.addListener === 'function') {
      this.mediaQuery.addListener(this.mediaListener);
    }
  }

  private detachMediaListener(): void {
    if (!this.mediaQuery || !this.mediaListener) {
      this.mediaListener = null;
      return;
    }

    if (typeof this.mediaQuery.removeEventListener === 'function') {
      this.mediaQuery.removeEventListener('change', this.mediaListener);
    } else if (typeof this.mediaQuery.removeListener === 'function') {
      this.mediaQuery.removeListener(this.mediaListener);
    }

    this.mediaListener = null;
  }
}
