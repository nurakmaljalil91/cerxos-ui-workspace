import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type CxsMultiSelectOption = {
  label: string;
  value: string;
};

export type CxsMultiSelectVariant = 'outline' | 'filled';
export type CxsMultiSelectSize = 'sm' | 'md' | 'lg';

const WRAPPER_CLASSES = 'flex w-full flex-col gap-1';
const LABEL_BASE_CLASSES = 'font-medium text-(--cxs-color-on-surface)';
const LABEL_DISABLED_CLASSES = 'text-[var(--cxs-color-on-surface-muted)]';

const CONTROL_BASE_CLASSES =
  'flex w-full flex-wrap items-center gap-2 rounded-[var(--cxs-radius-md)] border ' +
  'border-[var(--cxs-color-border)] transition-colors ' +
  'focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 ' +
  'focus-within:outline-[var(--cxs-color-focus)] focus-within:border-[var(--cxs-color-focus)]';

const CONTROL_DISABLED_CLASSES = 'pointer-events-none cursor-not-allowed opacity-60';

const VARIANT_CLASSES: Record<CxsMultiSelectVariant, string> = {
  outline: 'bg-[var(--cxs-color-surface)]',
  filled: 'bg-[var(--cxs-color-surface-hover)]'
};

const CONTROL_SIZE_CLASSES: Record<CxsMultiSelectSize, string> = {
  sm: 'min-h-8 px-2 py-1 text-sm',
  md: 'min-h-10 px-3 py-1.5 text-sm',
  lg: 'min-h-12 px-4 py-2 text-base'
};

const LABEL_SIZE_CLASSES: Record<CxsMultiSelectSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base'
};

const INPUT_CLASSES =
  'flex-1 min-w-[6rem] bg-transparent outline-none placeholder:text-[var(--cxs-color-on-surface-muted)]';

const CHIP_BASE_CLASSES =
  'inline-flex items-center gap-1 rounded-[var(--cxs-radius-sm)] ' +
  'bg-[var(--cxs-color-surface-hover)] text-[var(--cxs-color-on-surface)]';

const CHIP_SIZE_CLASSES: Record<CxsMultiSelectSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-2.5 py-1 text-sm'
};

const CHIP_REMOVE_CLASSES =
  'inline-flex h-4 w-4 items-center justify-center rounded-full ' +
  'text-[var(--cxs-color-on-surface-muted)] hover:text-[var(--cxs-color-on-surface)]';

const PANEL_CLASSES =
  'absolute left-0 top-full z-10 mt-2 w-full rounded-[var(--cxs-radius-md)] border ' +
  'border-[var(--cxs-color-border)] bg-[var(--cxs-color-surface)] p-1 shadow-[var(--cxs-shadow-sm)]';

const OPTION_BASE_CLASSES =
  'flex w-full items-center justify-between rounded-[var(--cxs-radius-sm)] px-3 py-2 text-left ' +
  'text-sm text-[var(--cxs-color-on-surface)] transition-colors hover:bg-[var(--cxs-color-surface-hover)]';

const OPTION_DISABLED_CLASSES = 'cursor-not-allowed opacity-50 hover:bg-transparent';

const EMPTY_STATE_CLASSES = 'px-3 py-2 text-sm text-[var(--cxs-color-on-surface-muted)]';

const INVALID_CLASSES =
  'border-[var(--cxs-color-danger)] focus-within:border-[var(--cxs-color-danger)] ' +
  'focus-within:outline-[var(--cxs-color-danger)]';

@Component({
  selector: 'cxs-multi-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multi-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CxsMultiSelectComponent),
      multi: true
    }
  ]
})
export class CxsMultiSelectComponent implements ControlValueAccessor {
  private static nextId = 0;

  @Input() options: CxsMultiSelectOption[] = [];
  @Input() value: string[] = [];
  @Input() variant: CxsMultiSelectVariant = 'outline';
  @Input() size: CxsMultiSelectSize = 'md';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() invalid = false;
  @Input() placeholder?: string;
  @Input() label?: string;
  @Input() maxSelections?: number;

  @Input() id?: string;
  @Input() name?: string;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedby?: string;

  @Output() valueChange = new EventEmitter<string[]>();

  @ViewChild('inputEl') inputEl?: ElementRef<HTMLInputElement>;

  readonly instanceId = `cxs-multi-select-${CxsMultiSelectComponent.nextId++}`;
  readonly listId = `${this.instanceId}-list`;

  query = '';
  isOpen = false;

  private disabledFromControl = false;
  private onChange: (value: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  get isDisabled(): boolean {
    return this.disabled || this.disabledFromControl;
  }

  get isAtMax(): boolean {
    return this.maxSelections !== undefined &&
      this.maxSelections !== null &&
      this.value.length >= this.maxSelections;
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

  get controlClass(): string {
    return [
      CONTROL_BASE_CLASSES,
      CONTROL_SIZE_CLASSES[this.size],
      VARIANT_CLASSES[this.variant],
      this.invalid ? INVALID_CLASSES : '',
      this.isDisabled ? CONTROL_DISABLED_CLASSES : ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  get inputClass(): string {
    return INPUT_CLASSES;
  }

  get chipClass(): string {
    return [CHIP_BASE_CLASSES, CHIP_SIZE_CLASSES[this.size]].join(' ');
  }

  get chipRemoveClass(): string {
    return CHIP_REMOVE_CLASSES;
  }

  get panelClass(): string {
    return PANEL_CLASSES;
  }

  get optionClass(): string {
    return OPTION_BASE_CLASSES;
  }

  get optionDisabledClass(): string {
    return OPTION_DISABLED_CLASSES;
  }

  get emptyStateClass(): string {
    return EMPTY_STATE_CLASSES;
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

  get ariaLabelValue(): string | null {
    if (this.label) {
      return null;
    }

    return this.ariaLabel ?? null;
  }

  get selectedOptions(): CxsMultiSelectOption[] {
    const optionsByValue = new Map(this.options.map((option) => [option.value, option]));
    return this.value.map((val) => optionsByValue.get(val) ?? { label: val, value: val });
  }

  get filteredOptions(): CxsMultiSelectOption[] {
    const selected = new Set(this.value);
    const query = this.query.trim().toLowerCase();

    return this.options.filter((option) => {
      if (selected.has(option.value)) {
        return false;
      }
      if (!query) {
        return true;
      }
      return option.label.toLowerCase().includes(query) || option.value.toLowerCase().includes(query);
    });
  }

  writeValue(value: string[] | null): void {
    this.value = value ? [...value] : [];
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledFromControl = isDisabled;
  }

  focusInput(): void {
    if (this.isDisabled || this.readonly) {
      return;
    }

    this.inputEl?.nativeElement.focus();
  }

  open(): void {
    if (this.isDisabled || this.readonly) {
      return;
    }

    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

  onQueryInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.query = target.value;
    this.open();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.query && this.value.length > 0) {
      this.removeValue(this.value[this.value.length - 1]);
    }
  }

  selectOption(option: CxsMultiSelectOption): void {
    if (this.isDisabled || this.readonly || this.isAtMax) {
      return;
    }
    if (this.value.includes(option.value)) {
      return;
    }

    const nextValue = [...this.value, option.value];
    this.updateValue(nextValue);
    this.query = '';
    this.open();
    this.focusInput();
  }

  removeValue(value: string): void {
    if (this.isDisabled || this.readonly) {
      return;
    }

    const nextValue = this.value.filter((item) => item !== value);
    this.updateValue(nextValue);
  }

  onOptionMouseDown(event: MouseEvent): void {
    event.preventDefault();
  }

  onChipMouseDown(event: MouseEvent): void {
    event.preventDefault();
  }

  onBlur(): void {
    this.onTouched();
  }

  private updateValue(nextValue: string[]): void {
    this.value = [...nextValue];
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen) {
      return;
    }

    const target = event.target as HTMLElement | null;
    if (target && !this.elementRef.nativeElement.contains(target)) {
      this.close();
    }
  }
}
