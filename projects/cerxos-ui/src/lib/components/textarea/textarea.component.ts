import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type CxsTextareaVariant = 'outline' | 'filled';
export type CxsTextareaSize = 'sm' | 'md' | 'lg';
export type CxsTextareaResize = 'vertical' | 'none';

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

const VARIANT_CLASSES: Record<CxsTextareaVariant, string> = {
  outline: 'bg-[var(--cxs-color-surface)]',
  filled: 'bg-[var(--cxs-color-surface-hover)]'
};

const SIZE_CLASSES: Record<CxsTextareaSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base'
};

const RESIZE_CLASSES: Record<CxsTextareaResize, string> = {
  vertical: 'resize-y',
  none: 'resize-none'
};

const LABEL_SIZE_CLASSES: Record<CxsTextareaSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base'
};

const ERROR_SIZE_CLASSES: Record<CxsTextareaSize, string> = {
  sm: 'text-xs',
  md: 'text-xs',
  lg: 'text-sm'
};

const INVALID_CLASSES =
  'border-[var(--cxs-color-danger)] focus-visible:border-[var(--cxs-color-danger)] ' +
  'focus-visible:outline-[var(--cxs-color-danger)]';

@Component({
  selector: 'cxs-textarea',
  standalone: true,
  templateUrl: './textarea.component.html',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CxsTextareaComponent),
      multi: true
    }
  ]
})
export class CxsTextareaComponent implements ControlValueAccessor {
  private readonly changeDetector = inject(ChangeDetectorRef);
  private static nextId = 0;

  @Input() value = '';
  @Input() variant: CxsTextareaVariant = 'outline';
  @Input() size: CxsTextareaSize = 'md';
  @Input() rows = 3;
  @Input() resize: CxsTextareaResize = 'vertical';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() invalid = false;
  @Input() label?: string;

  @Input() id?: string;
  @Input() name?: string;
  @Input() placeholder?: string;
  @Input() maxlength?: number;
  @Input() spellcheck: boolean | null = null;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedby?: string;

  @Output() valueChange = new EventEmitter<string>();

  readonly instanceId = `cxs-textarea-${CxsTextareaComponent.nextId++}`;

  private disabledFromControl = false;
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get isDisabled(): boolean {
    return this.disabled || this.disabledFromControl;
  }

  get textareaClass(): string {
    return [
      BASE_CLASSES,
      SIZE_CLASSES[this.size],
      VARIANT_CLASSES[this.variant],
      RESIZE_CLASSES[this.resize],
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

  get textareaId(): string | null {
    if (this.id) {
      return this.id;
    }

    return this.label ? this.instanceId : null;
  }

  get labelId(): string | null {
    if (!this.label) {
      return null;
    }

    return `${this.textareaId}-label`;
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
    this.changeDetector.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledFromControl = isDisabled;
    this.changeDetector.markForCheck();
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    const nextValue = target.value;

    this.value = nextValue;
    this.onChange(nextValue);
    this.valueChange.emit(nextValue);
  }

  onBlur(): void {
    this.onTouched();
  }
}
