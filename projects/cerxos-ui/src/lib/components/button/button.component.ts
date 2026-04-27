import { Attribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CxsIconComponent, CxsIconName } from '../icon/icon.component';

export type CxsButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
export type CxsButtonSize = 'sm' | 'md' | 'lg';
export type CxsButtonIconPosition = 'start' | 'end';

const BASE_CLASSES =
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--cxs-color-focus)] disabled:pointer-events-none disabled:opacity-50';

const VARIANT_CLASSES: Record<CxsButtonVariant, string> = {
  primary:
    'bg-[var(--cxs-color-primary)] text-[var(--cxs-color-on-primary)] ' +
    'hover:bg-[var(--cxs-color-primary-hover)] shadow-[var(--cxs-shadow-sm)]',
  danger:
    'bg-[var(--cxs-color-danger-surface)] text-[var(--cxs-color-danger)] ' +
    'hover:bg-[var(--cxs-color-danger-surface-hover)] shadow-[var(--cxs-shadow-sm)]',
  secondary:
    'bg-[var(--cxs-color-surface)] text-[var(--cxs-color-on-surface)] ' +
    'border border-[var(--cxs-color-border)] hover:bg-[var(--cxs-color-surface-hover)]',
  outline:
    'border border-[var(--cxs-color-border)] bg-transparent text-[var(--cxs-color-primary)] ' +
    'hover:bg-[var(--cxs-color-primary-ghost)]',
  ghost:
    'bg-transparent text-[var(--cxs-color-primary)] hover:bg-[var(--cxs-color-primary-ghost)]'
};

const SIZE_CLASSES: Record<CxsButtonSize, string> = {
  sm: 'h-8 px-3 text-sm rounded-[var(--cxs-radius-md)]',
  md: 'h-10 px-4 text-sm rounded-[var(--cxs-radius-md)]',
  lg: 'h-12 px-5 text-base rounded-[var(--cxs-radius-md)]'
};

const ICON_ONLY_SIZE_CLASSES: Record<CxsButtonSize, string> = {
  sm: 'h-8 w-8 rounded-full p-0',
  md: 'h-10 w-10 rounded-full p-0',
  lg: 'h-12 w-12 rounded-full p-0'
};

@Component({
  selector: 'cxs-button',
  standalone: true,
  templateUrl: './button.component.html',
  imports: [CxsIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsButtonComponent {
  @Input() variant: CxsButtonVariant = 'primary';
  @Input() size: CxsButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() icon?: CxsIconName;
  @Input() iconPosition: CxsButtonIconPosition = 'start';
  @Input() iconOnly = false;
  @Input() ariaLabel?: string;

  constructor(@Attribute('class') private readonly hostClass: string | null) {}

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  get leadingIconName(): CxsIconName | null {
    if (this.loading || !this.icon || this.iconPosition !== 'start') {
      return null;
    }

    return this.icon;
  }

  get trailingIconName(): CxsIconName | null {
    if (this.loading || !this.icon || this.iconPosition !== 'end') {
      return null;
    }

    return this.icon;
  }

  get ariaLabelValue(): string | null {
    if (!this.iconOnly) {
      return this.ariaLabel?.trim() || null;
    }

    if (!this.ariaLabel?.trim()) {
      throw new Error('cxs-button with iconOnly=true requires ariaLabel.');
    }

    return this.ariaLabel.trim();
  }

  get buttonClass(): string {
    return [
      BASE_CLASSES,
      this.iconOnly ? ICON_ONLY_SIZE_CLASSES[this.size] : SIZE_CLASSES[this.size],
      VARIANT_CLASSES[this.variant],
      this.iconOnly ? 'gap-0' : '',
      this.hostClass
    ]
      .filter(Boolean)
      .join(' ');
  }
}
