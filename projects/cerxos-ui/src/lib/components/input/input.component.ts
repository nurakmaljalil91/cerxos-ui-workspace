import { CommonModule } from '@angular/common';
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

const WRAPPER_CLASSES = 'flex w-full flex-col gap-1';
const LABEL_BASE_CLASSES = 'font-medium text-(--cxs-color-on-surface)';
const LABEL_DISABLED_CLASSES = 'text-[var(--cxs-color-on-surface-muted)]';
const ERROR_BASE_CLASSES = 'text-[var(--cxs-color-danger)]';

const VARIANT_CLASSES: Record<CxsInputVariant, string> = {
  outline: 'bg-[var(--cxs-color-surface)]',
  filled: 'bg-[var(--cxs-color-surface-hover)]'
};

const SIZE_CLASSES: Record<CxsInputSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-3 text-sm',
  lg: 'h-12 px-4 text-base'
};

const LABEL_SIZE_CLASSES: Record<CxsInputSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base'
};

const ERROR_SIZE_CLASSES: Record<CxsInputSize, string> = {
  sm: 'text-xs',
  md: 'text-xs',
  lg: 'text-sm'
};

const INVALID_CLASSES =
  'border-[var(--cxs-color-danger)] focus-visible:border-[var(--cxs-color-danger)] ' +
  'focus-visible:outline-[var(--cxs-color-danger)]';

@Component({
  selector: 'cxs-input',
  standalone: true,
  templateUrl: './input.component.html',
  imports: [CommonModule],
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
  private static nextId = 0;

  @Input() value = '';
  @Input() type: CxsInputType = 'text';
  @Input() variant: CxsInputVariant = 'outline';
  @Input() size: CxsInputSize = 'md';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() invalid = false;
  @Input() autofocus = false;
  @Input() label?: string;

  @Input() id?: string;
  @Input() name?: string;
  @Input() placeholder?: string;
  @Input() autocomplete?: string;
  @Input() inputmode?: string;
  @Input() spellcheck: boolean | null = null;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedby?: string;

  @Output() valueChange = new EventEmitter<string>();

  readonly instanceId = `cxs-input-${CxsInputComponent.nextId++}`;

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

  get wrapperClass(): string {
    return WRAPPER_CLASSES;
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

  get inputId(): string | null {
    if (this.id) {
      return this.id;
    }

    return this.label ? this.instanceId : null;
  }

  get labelId(): string | null {
    if (!this.label) {
      return null;
    }

    return `${this.inputId}-label`;
  }

  get errorId(): string {
    return `${this.instanceId}-error`;
  }

  get ariaLabelValue(): string | null {
    if (this.label) {
      return null;
    }

    return this.ariaLabel ?? null;
  }

  get ariaDescribedbyValue(): string | null {
    const tokens = [this.ariaDescribedby].filter(Boolean) as string[];

    if (this.invalid) {
      tokens.push(this.errorId);
    }

    return tokens.length > 0 ? tokens.join(' ') : null;
  }

  get errorClass(): string {
    return [ERROR_BASE_CLASSES, ERROR_SIZE_CLASSES[this.size]].join(' ');
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
