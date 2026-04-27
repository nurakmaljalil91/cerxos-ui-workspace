import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type CxsProgressBarVariant = 'primary' | 'neutral' | 'danger';
export type CxsProgressBarSize = 'sm' | 'md' | 'lg';

const WRAPPER_CLASSES = 'flex w-full flex-col gap-1.5';
const HEADER_CLASSES = 'flex items-center justify-between gap-3';
const LABEL_CLASSES = 'text-sm font-medium text-[var(--cxs-color-on-surface)]';
const VALUE_CLASSES = 'text-sm text-[var(--cxs-color-on-surface-muted)]';

const TRACK_BASE_CLASSES =
  'relative w-full overflow-hidden rounded-full bg-[var(--cxs-color-surface-hover)]';

const TRACK_SIZE_CLASSES: Record<CxsProgressBarSize, string> = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4'
};

const FILL_BASE_CLASSES = 'h-full rounded-full transition-[width] duration-300 ease-out';
const INDETERMINATE_FILL_CLASSES =
  'absolute inset-y-0 left-0 w-2/5 rounded-full animate-[cxs-progress-indeterminate_1.4s_ease-in-out_infinite]';

const FILL_VARIANT_CLASSES: Record<CxsProgressBarVariant, string> = {
  primary: 'bg-[var(--cxs-color-primary)]',
  neutral: 'bg-[var(--cxs-color-on-surface-muted)]',
  danger: 'bg-[var(--cxs-color-danger)]'
};

@Component({
  selector: 'cxs-progress-bar',
  standalone: true,
  templateUrl: './progress-bar.component.html',
  styles: [
    `
      @keyframes cxs-progress-indeterminate {
        0% {
          transform: translateX(-100%);
        }

        50% {
          transform: translateX(60%);
        }

        100% {
          transform: translateX(250%);
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsProgressBarComponent {
  private static nextId = 0;

  @Input() value = 0;
  @Input() max = 100;
  @Input() variant: CxsProgressBarVariant = 'primary';
  @Input() size: CxsProgressBarSize = 'md';
  @Input() label?: string;
  @Input() showValue = false;
  @Input() indeterminate = false;
  @Input() ariaLabel = 'Progress';

  readonly labelId = `cxs-progress-bar-label-${++CxsProgressBarComponent.nextId}`;

  get wrapperClass(): string {
    return WRAPPER_CLASSES;
  }

  get headerClass(): string {
    return HEADER_CLASSES;
  }

  get labelClass(): string {
    return LABEL_CLASSES;
  }

  get valueClass(): string {
    return VALUE_CLASSES;
  }

  get trackClass(): string {
    return [TRACK_BASE_CLASSES, TRACK_SIZE_CLASSES[this.size]].join(' ');
  }

  get fillClass(): string {
    return [FILL_BASE_CLASSES, FILL_VARIANT_CLASSES[this.variant]].join(' ');
  }

  get indeterminateFillClass(): string {
    return [INDETERMINATE_FILL_CLASSES, FILL_VARIANT_CLASSES[this.variant]].join(' ');
  }

  get normalizedMax(): number {
    return Number.isFinite(this.max) && this.max > 0 ? this.max : 100;
  }

  get clampedValue(): number {
    if (!Number.isFinite(this.value)) {
      return 0;
    }

    return Math.min(Math.max(this.value, 0), this.normalizedMax);
  }

  get progressPercent(): number {
    return (this.clampedValue / this.normalizedMax) * 100;
  }

  get progressText(): string {
    return `${Math.round(this.progressPercent)}%`;
  }

  get statusText(): string {
    return this.indeterminate ? 'Loading' : this.progressText;
  }

  get ariaLabelValue(): string | null {
    return this.label ? null : this.ariaLabel;
  }

  get ariaValueNow(): number | null {
    return this.indeterminate ? null : this.clampedValue;
  }

  get ariaValueText(): string | null {
    return this.indeterminate ? 'Loading' : this.showValue ? this.progressText : null;
  }
}
