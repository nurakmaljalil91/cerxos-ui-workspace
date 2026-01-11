import { Attribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type CxsButtonVariant = 'primary' | 'secondary' | 'ghost';
export type CxsButtonSize = 'sm' | 'md' | 'lg';

const BASE_CLASSES =
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--cxs-color-focus)] disabled:pointer-events-none disabled:opacity-50';

const VARIANT_CLASSES: Record<CxsButtonVariant, string> = {
  primary:
    'bg-[var(--cxs-color-primary)] text-[var(--cxs-color-on-primary)] ' +
    'hover:bg-[var(--cxs-color-primary-hover)] shadow-[var(--cxs-shadow-sm)]',
  secondary:
    'bg-[var(--cxs-color-surface)] text-[var(--cxs-color-on-surface)] ' +
    'border border-[var(--cxs-color-border)] hover:bg-[var(--cxs-color-surface-hover)]',
  ghost:
    'bg-transparent text-[var(--cxs-color-primary)] hover:bg-[var(--cxs-color-primary-ghost)]'
};

const SIZE_CLASSES: Record<CxsButtonSize, string> = {
  sm: 'h-8 px-3 text-sm rounded-[var(--cxs-radius-md)]',
  md: 'h-10 px-4 text-sm rounded-[var(--cxs-radius-md)]',
  lg: 'h-12 px-5 text-base rounded-[var(--cxs-radius-md)]'
};

@Component({
  selector: 'cxs-button',
  standalone: true,
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsButtonComponent {
  @Input() variant: CxsButtonVariant = 'primary';
  @Input() size: CxsButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  constructor(@Attribute('class') private readonly hostClass: string | null) {}

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  get buttonClass(): string {
    return [BASE_CLASSES, SIZE_CLASSES[this.size], VARIANT_CLASSES[this.variant], this.hostClass]
      .filter(Boolean)
      .join(' ');
  }
}
