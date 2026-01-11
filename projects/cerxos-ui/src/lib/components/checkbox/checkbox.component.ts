import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type CxsCheckboxSize = 'sm' | 'md' | 'lg';

const WRAPPER_BASE = 'inline-flex items-center gap-2 select-none';
const WRAPPER_ENABLED = 'cursor-pointer';
const WRAPPER_DISABLED = 'cursor-not-allowed opacity-60';

const LABEL_BASE = 'text-[var(--cxs-color-on-surface)]';
const LABEL_DISABLED = 'text-[var(--cxs-color-on-surface-muted)]';
const LABEL_SIZE_CLASSES: Record<CxsCheckboxSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base'
};

const CONTROL_BASE =
  "relative flex shrink-0 items-center justify-center rounded-[var(--cxs-radius-md)] border " +
  "border-[var(--cxs-color-border)] bg-[var(--cxs-color-surface)] text-[var(--cxs-color-on-primary)] " +
  "transition-colors after:absolute after:origin-center after:rotate-45 after:content-[''] " +
  'after:opacity-0 after:transition-opacity after:border-b-2 after:border-r-2 after:border-current ' +
  "before:absolute before:content-[''] before:opacity-0 before:transition-opacity before:bg-current " +
  'peer-checked:bg-[var(--cxs-color-primary)] peer-checked:border-[var(--cxs-color-primary)] ' +
  'peer-checked:after:opacity-100 ' +
  'peer-indeterminate:bg-[var(--cxs-color-primary)] peer-indeterminate:border-[var(--cxs-color-primary)] ' +
  'peer-indeterminate:before:opacity-100 peer-indeterminate:after:opacity-0 ' +
  'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 ' +
  'peer-focus-visible:outline-[var(--cxs-color-focus)]';

const CONTROL_SIZE_CLASSES: Record<CxsCheckboxSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6'
};

const MARK_SIZE_CLASSES: Record<CxsCheckboxSize, string> = {
  sm: 'after:h-2 after:w-1 before:h-0.5 before:w-2',
  md: 'after:h-2.5 after:w-1.5 before:h-0.5 before:w-3',
  lg: 'after:h-3 after:w-2 before:h-0.5 before:w-4'
};

@Component({
  selector: 'cxs-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CxsCheckboxComponent),
      multi: true
    }
  ]
})
export class CxsCheckboxComponent implements ControlValueAccessor {
  @Input() checked = false;
  @Input() indeterminate = false;
  @Input() disabled = false;
  @Input() label?: string;
  @Input() size: CxsCheckboxSize = 'md';

  @Input() id?: string;
  @Input() name?: string;
  @Input() required = false;
  @Input() autofocus = false;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedby?: string;

  @Output() valueChange = new EventEmitter<boolean>();

  private disabledFromControl = false;
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  get isDisabled(): boolean {
    return this.disabled || this.disabledFromControl;
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
      MARK_SIZE_CLASSES[this.size]
    ].join(' ');
  }

  get ariaChecked(): 'mixed' | null {
    return this.indeterminate ? 'mixed' : null;
  }

  writeValue(value: boolean | null): void {
    this.checked = value ?? false;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledFromControl = isDisabled;
  }

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const nextValue = target.checked;

    this.indeterminate = false;
    this.checked = nextValue;
    this.onChange(nextValue);
    this.valueChange.emit(nextValue);
  }

  onBlur(): void {
    this.onTouched();
  }
}
