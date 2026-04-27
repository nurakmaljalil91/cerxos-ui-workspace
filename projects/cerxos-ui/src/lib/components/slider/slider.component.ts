import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type CxsSliderVariant = 'primary' | 'danger';
export type CxsSliderSize = 'sm' | 'md' | 'lg';

const WRAPPER_CLASSES = 'flex w-full flex-col gap-1.5';
const HEADER_CLASSES = 'flex items-center justify-between gap-3';
const LABEL_BASE_CLASSES = 'font-medium text-[var(--cxs-color-on-surface)]';
const LABEL_DISABLED_CLASSES = 'text-[var(--cxs-color-on-surface-muted)]';
const VALUE_CLASSES = 'text-sm text-[var(--cxs-color-on-surface-muted)]';

const LABEL_SIZE_CLASSES: Record<CxsSliderSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base'
};

const INPUT_BASE_CLASSES =
  'cxs-slider block w-full appearance-none bg-transparent focus:outline-none ' +
  'disabled:cursor-not-allowed disabled:opacity-60';

const INPUT_SIZE_CLASSES: Record<CxsSliderSize, string> = {
  sm: 'cxs-slider--sm',
  md: 'cxs-slider--md',
  lg: 'cxs-slider--lg'
};

const INPUT_VARIANT_CLASSES: Record<CxsSliderVariant, string> = {
  primary: 'cxs-slider--primary',
  danger: 'cxs-slider--danger'
};

@Component({
  selector: 'cxs-slider',
  standalone: true,
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CxsSliderComponent),
      multi: true
    }
  ]
})
export class CxsSliderComponent implements ControlValueAccessor {
  private static nextId = 0;

  @Input() value = 0;
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() variant: CxsSliderVariant = 'primary';
  @Input() size: CxsSliderSize = 'md';
  @Input() disabled = false;
  @Input() required = false;
  @Input() showValue = false;
  @Input() label?: string;

  @Input() id?: string;
  @Input() name?: string;
  @Input() ariaLabel = 'Slider';
  @Input() ariaDescribedby?: string;

  @Output() valueChange = new EventEmitter<number>();

  readonly instanceId = `cxs-slider-${CxsSliderComponent.nextId++}`;

  private disabledFromControl = false;
  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  get isDisabled(): boolean {
    return this.disabled || this.disabledFromControl;
  }

  get normalizedMin(): number {
    return Number.isFinite(this.min) ? this.min : 0;
  }

  get normalizedMax(): number {
    if (!Number.isFinite(this.max) || this.max <= this.normalizedMin) {
      return this.normalizedMin + 100;
    }

    return this.max;
  }

  get normalizedStep(): number {
    return Number.isFinite(this.step) && this.step > 0 ? this.step : 1;
  }

  get clampedValue(): number {
    if (!Number.isFinite(this.value)) {
      return this.normalizedMin;
    }

    return Math.min(Math.max(this.value, this.normalizedMin), this.normalizedMax);
  }

  get progressPercent(): number {
    return (
      ((this.clampedValue - this.normalizedMin) / (this.normalizedMax - this.normalizedMin)) *
      100
    );
  }

  get sliderClass(): string {
    return [
      INPUT_BASE_CLASSES,
      INPUT_SIZE_CLASSES[this.size],
      INPUT_VARIANT_CLASSES[this.variant]
    ].join(' ');
  }

  get wrapperClass(): string {
    return WRAPPER_CLASSES;
  }

  get headerClass(): string {
    return HEADER_CLASSES;
  }

  get labelClass(): string {
    return [
      LABEL_BASE_CLASSES,
      LABEL_SIZE_CLASSES[this.size],
      this.isDisabled ? LABEL_DISABLED_CLASSES : ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  get valueClass(): string {
    return VALUE_CLASSES;
  }

  get inputId(): string {
    return this.id ?? this.instanceId;
  }

  get labelId(): string | null {
    return this.label ? `${this.inputId}-label` : null;
  }

  get ariaLabelValue(): string | null {
    return this.label ? null : this.ariaLabel;
  }

  get ariaDescribedbyValue(): string | null {
    const tokens = [this.ariaDescribedby].filter(Boolean) as string[];
    return tokens.length > 0 ? tokens.join(' ') : null;
  }

  get valueText(): string {
    const displayValue = Number.isInteger(this.clampedValue)
      ? `${this.clampedValue}`
      : `${this.clampedValue}`;

    return displayValue;
  }

  get fillColor(): string {
    return this.variant === 'danger'
      ? 'var(--cxs-color-danger)'
      : 'var(--cxs-color-primary)';
  }

  writeValue(value: number | null): void {
    this.value = value ?? this.normalizedMin;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledFromControl = isDisabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const nextValue = Number.parseFloat(target.value);
    const value = Number.isFinite(nextValue) ? nextValue : this.normalizedMin;

    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
