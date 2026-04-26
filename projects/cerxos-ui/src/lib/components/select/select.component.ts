import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type CxsSelectVariant = 'outline' | 'filled';
export type CxsSelectSize = 'sm' | 'md' | 'lg';

const BASE_CLASSES =
  'w-full appearance-none rounded-[var(--cxs-radius-md)] border border-[var(--cxs-color-border)] ' +
  'bg-[var(--cxs-color-surface)] text-[var(--cxs-color-on-surface)] ' +
  'placeholder:text-[var(--cxs-color-on-surface-muted)] transition-colors ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--cxs-color-focus)] focus-visible:border-[var(--cxs-color-focus)] ' +
  'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60';

const WRAPPER_CLASSES = 'flex w-full flex-col gap-1';
const LABEL_BASE_CLASSES = 'font-medium text-(--cxs-color-on-surface)';
const LABEL_DISABLED_CLASSES = 'text-[var(--cxs-color-on-surface-muted)]';

const VARIANT_CLASSES: Record<CxsSelectVariant, string> = {
  outline: 'bg-[var(--cxs-color-surface)]',
  filled: 'bg-[var(--cxs-color-surface-hover)]'
};

const SIZE_CLASSES: Record<CxsSelectSize, string> = {
  sm: 'h-8 pl-3 pr-9 text-sm',
  md: 'h-10 pl-3 pr-9 text-sm',
  lg: 'h-12 pl-4 pr-10 text-base'
};

const LABEL_SIZE_CLASSES: Record<CxsSelectSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base'
};

const INVALID_CLASSES =
  'border-[var(--cxs-color-danger)] focus-visible:border-[var(--cxs-color-danger)] ' +
  'focus-visible:outline-[var(--cxs-color-danger)]';

@Component({
  selector: 'cxs-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CxsSelectComponent),
      multi: true
    }
  ]
})
export class CxsSelectComponent implements ControlValueAccessor {
  private static nextId = 0;

  @Input() value = '';
  @Input() variant: CxsSelectVariant = 'outline';
  @Input() size: CxsSelectSize = 'md';
  @Input() disabled = false;
  @Input() required = false;
  @Input() invalid = false;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() placeholderValue = '';

  @Input() id?: string;
  @Input() name?: string;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedby?: string;

  @Output() valueChange = new EventEmitter<string>();

  readonly instanceId = `cxs-select-${CxsSelectComponent.nextId++}`;

  private disabledFromControl = false;
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get isDisabled(): boolean {
    return this.disabled || this.disabledFromControl;
  }

  get selectClass(): string {
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

  get selectId(): string | null {
    if (this.id) {
      return this.id;
    }

    return this.label ? this.instanceId : null;
  }

  get labelId(): string | null {
    if (!this.label) {
      return null;
    }

    return `${this.selectId}-label`;
  }

  get ariaLabelValue(): string | null {
    if (this.label) {
      return null;
    }

    return this.ariaLabel ?? null;
  }

  get selectValue(): string {
    if (this.placeholder && this.value === '') {
      return this.placeholderValue;
    }

    return this.value;
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

  onSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const nextValue = target.value;

    this.value = nextValue;
    this.onChange(nextValue);
    this.valueChange.emit(nextValue);
  }

  onBlur(): void {
    this.onTouched();
  }
}
