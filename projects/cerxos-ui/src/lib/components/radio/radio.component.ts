import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type CxsRadioSize = 'sm' | 'md' | 'lg';
export type CxsRadioVariant = 'primary' | 'secondary';

const WRAPPER_BASE = 'inline-flex items-center gap-2 select-none';
const WRAPPER_ENABLED = 'cursor-pointer';
const WRAPPER_DISABLED = 'cursor-not-allowed opacity-60';

const LABEL_BASE = 'text-[var(--cxs-color-on-surface)]';
const LABEL_DISABLED = 'text-[var(--cxs-color-on-surface-muted)]';
const LABEL_SIZE_CLASSES: Record<CxsRadioSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base'
};

const CONTROL_BASE =
  "relative flex shrink-0 items-center justify-center rounded-full border " +
  "bg-[var(--cxs-color-surface)] transition-colors " +
  "after:absolute after:inset-0 after:m-auto after:rounded-full after:content-[''] " +
  'after:transition-transform after:scale-0 peer-checked:after:scale-100 ' +
  'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 ' +
  'peer-focus-visible:outline-[var(--cxs-color-focus)]';

const CONTROL_SIZE_CLASSES: Record<CxsRadioSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6'
};

const CONTROL_VARIANT_CLASSES: Record<CxsRadioVariant, string> = {
  primary:
    'peer-checked:border-[var(--cxs-color-primary)] after:bg-[var(--cxs-color-primary)]',
  secondary:
    'peer-checked:border-[var(--cxs-color-on-surface)] after:bg-[var(--cxs-color-on-surface)]'
};

const DOT_SIZE_CLASSES: Record<CxsRadioSize, string> = {
  sm: 'after:h-2 after:w-2',
  md: 'after:h-2.5 after:w-2.5',
  lg: 'after:h-3 after:w-3'
};

const INVALID_CLASSES =
  'border-[var(--cxs-color-danger)] peer-checked:border-[var(--cxs-color-danger)] ' +
  'after:bg-[var(--cxs-color-danger)]';

@Component({
  selector: 'cxs-radio',
  standalone: true,
  templateUrl: './radio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CxsRadioComponent),
      multi: true
    }
  ]
})
export class CxsRadioComponent implements ControlValueAccessor {
  @Input() value = '';
  @Input() name?: string;
  @Input() variant: CxsRadioVariant = 'primary';
  @Input() size: CxsRadioSize = 'md';
  @Input() disabled = false;
  @Input() required = false;
  @Input() invalid = false;
  @Input() autofocus = false;

  @Input() id?: string;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedby?: string;

  @Output() valueChange = new EventEmitter<string>();

  private selectedValue: string | null = null;
  private disabledFromControl = false;
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get isDisabled(): boolean {
    return this.disabled || this.disabledFromControl;
  }

  get isChecked(): boolean {
    return this.selectedValue !== null && this.selectedValue === this.value;
  }

  get wrapperClass(): string {
    return [
      WRAPPER_BASE,
      this.isDisabled ? WRAPPER_DISABLED : WRAPPER_ENABLED
    ].join(' ');
  }

  get labelClass(): string {
    return [
      LABEL_BASE,
      LABEL_SIZE_CLASSES[this.size],
      this.isDisabled ? LABEL_DISABLED : ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  get controlClass(): string {
    return [
      CONTROL_BASE,
      CONTROL_SIZE_CLASSES[this.size],
      DOT_SIZE_CLASSES[this.size],
      CONTROL_VARIANT_CLASSES[this.variant],
      this.invalid ? INVALID_CLASSES : ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  writeValue(value: string | null): void {
    this.selectedValue = value ?? null;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledFromControl = isDisabled;
  }

  onRadioChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (!target.checked) {
      return;
    }

    this.selectedValue = this.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
