import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type CxsInputVariant = 'outline' | 'filled';
export type CxsInputSize = 'sm' | 'md' | 'lg';
export type CxsInputType =
  | 'text'
  | 'email'
  | 'password'
  | 'search'
  | 'tel'
  | 'url'
  | 'number';

const BASE_CLASSES =
  'w-full rounded-[var(--cxs-radius-md)] border border-[var(--cxs-color-border)] ' +
  'bg-[var(--cxs-color-surface)] text-[var(--cxs-color-on-surface)] ' +
  'placeholder:text-[var(--cxs-color-on-surface-muted)] transition-colors ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--cxs-color-focus)] focus-visible:border-[var(--cxs-color-focus)] ' +
  'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60';

const VARIANT_CLASSES: Record<CxsInputVariant, string> = {
  outline: 'bg-[var(--cxs-color-surface)]',
  filled: 'bg-[var(--cxs-color-surface-hover)]'
};

const SIZE_CLASSES: Record<CxsInputSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-3 text-sm',
  lg: 'h-12 px-4 text-base'
};

const INVALID_CLASSES =
  'border-[var(--cxs-color-danger)] focus-visible:border-[var(--cxs-color-danger)] ' +
  'focus-visible:outline-[var(--cxs-color-danger)]';

@Component({
  selector: 'cxs-input',
  standalone: true,
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CxsInputComponent),
      multi: true
    }
  ]
})
export class CxsInputComponent implements ControlValueAccessor {
  @Input() value = '';
  @Input() type: CxsInputType = 'text';
  @Input() variant: CxsInputVariant = 'outline';
  @Input() size: CxsInputSize = 'md';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() invalid = false;
  @Input() autofocus = false;

  @Input() id?: string;
  @Input() name?: string;
  @Input() placeholder?: string;
  @Input() autocomplete?: string;
  @Input() inputmode?: string;
  @Input() spellcheck: boolean | null = null;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedby?: string;

  @Output() valueChange = new EventEmitter<string>();

  private disabledFromControl = false;
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get isDisabled(): boolean {
    return this.disabled || this.disabledFromControl;
  }

  get inputClass(): string {
    return [
      BASE_CLASSES,
      SIZE_CLASSES[this.size],
      VARIANT_CLASSES[this.variant],
      this.invalid ? INVALID_CLASSES : ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  writeValue(value: string | null): void {
    this.value = value ?? '';
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

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const nextValue = target.value;

    this.value = nextValue;
    this.onChange(nextValue);
    this.valueChange.emit(nextValue);
  }

  onBlur(): void {
    this.onTouched();
  }
}
