import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type CxsDatepickerVariant = 'outline' | 'filled';
export type CxsDatepickerSize = 'sm' | 'md' | 'lg';

type CxsCalendarDay = {
  date: Date;
  label: string;
  inMonth: boolean;
  disabled: boolean;
  isToday: boolean;
  key: string;
};

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

const VARIANT_CLASSES: Record<CxsDatepickerVariant, string> = {
  outline: 'bg-[var(--cxs-color-surface)]',
  filled: 'bg-[var(--cxs-color-surface-hover)]'
};

const SIZE_CLASSES: Record<CxsDatepickerSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-3 text-sm',
  lg: 'h-12 px-4 text-base'
};

const LABEL_SIZE_CLASSES: Record<CxsDatepickerSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base'
};

const INVALID_CLASSES =
  'border-[var(--cxs-color-danger)] focus-visible:border-[var(--cxs-color-danger)] ' +
  'focus-visible:outline-[var(--cxs-color-danger)]';

const POPOVER_CLASSES =
  'absolute left-0 top-full z-10 mt-2 w-full rounded-[var(--cxs-radius-md)] border ' +
  'border-[var(--cxs-color-border)] bg-[var(--cxs-color-surface)] p-3 shadow-[var(--cxs-shadow-sm)]';

const NAV_BUTTON_CLASSES =
  'inline-flex h-8 w-8 items-center justify-center rounded-[var(--cxs-radius-md)] ' +
  'text-[var(--cxs-color-on-surface)] transition-colors hover:bg-[var(--cxs-color-surface-hover)] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--cxs-color-focus)]';

const SELECT_CLASSES =
  'h-8 rounded-[var(--cxs-radius-md)] border border-[var(--cxs-color-border)] ' +
  'bg-[var(--cxs-color-surface)] text-[var(--cxs-color-on-surface)] text-xs px-2 ' +
  'transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--cxs-color-focus)]';

const DAY_BUTTON_BASE =
  'flex h-8 w-8 items-center justify-center rounded-[var(--cxs-radius-md)] text-xs ' +
  'transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--cxs-color-focus)] disabled:cursor-not-allowed disabled:opacity-40';

const DAY_OUTSIDE_MONTH = 'text-[var(--cxs-color-on-surface-muted)]';
const DAY_TODAY = 'border border-[var(--cxs-color-primary)]';
const DAY_SELECTED = 'bg-[var(--cxs-color-primary)] text-[var(--cxs-color-on-primary)]';
const DAY_HOVER = 'hover:bg-[var(--cxs-color-surface-hover)]';

@Component({
  selector: 'cxs-datepicker',
  standalone: true,
  templateUrl: './datepicker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CxsDatepickerComponent),
      multi: true
    }
  ]
})
export class CxsDatepickerComponent implements ControlValueAccessor {
  private static nextId = 0;

  @Input() value = '';
  @Input() variant: CxsDatepickerVariant = 'outline';
  @Input() size: CxsDatepickerSize = 'md';
  @Input() useNative = true;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() invalid = false;
  @Input() autofocus = false;
  @Input() label?: string;

  @Input() id?: string;
  @Input() name?: string;
  @Input() min?: string;
  @Input() max?: string;
  @Input() placeholder?: string;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedby?: string;

  @Output() valueChange = new EventEmitter<string>();

  readonly instanceId = `cxs-datepicker-${CxsDatepickerComponent.nextId++}`;
  private disabledFromControl = false;
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  isOpen = false;
  displayMonth = new Date();
  calendarDays: CxsCalendarDay[] = [];
  readonly weekDayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  readonly monthOptions = Array.from({ length: 12 }, (_, index) => ({
    value: index,
    label: new Date(2020, index, 1).toLocaleString('en-US', { month: 'short' })
  }));

  get isDisabled(): boolean {
    return this.disabled || this.disabledFromControl;
  }

  get panelId(): string {
    return `${this.inputId ?? this.instanceId}-panel`;
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

  get ariaLabelValue(): string | null {
    if (this.label) {
      return null;
    }

    return this.ariaLabel ?? null;
  }

  get popoverClass(): string {
    return POPOVER_CLASSES;
  }

  get navButtonClass(): string {
    return NAV_BUTTON_CLASSES;
  }

  get selectClass(): string {
    return SELECT_CLASSES;
  }

  get displayMonthLabel(): string {
    return this.displayMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }

  get yearOptions(): number[] {
    const baseYear = this.displayMonth.getFullYear();
    const minYear = this.parseDate(this.min)?.getFullYear() ?? baseYear - 10;
    const maxYear = this.parseDate(this.max)?.getFullYear() ?? baseYear + 10;

    const start = Math.min(minYear, maxYear);
    const end = Math.max(minYear, maxYear);

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  writeValue(value: string | null): void {
    this.value = value ?? '';
    this.syncDisplayMonthWithValue();
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

  onDateSelect(day: CxsCalendarDay): void {
    if (day.disabled || this.isDisabled) {
      return;
    }

    const nextValue = this.formatDate(day.date);
    this.value = nextValue;
    this.onChange(nextValue);
    this.valueChange.emit(nextValue);
    this.isOpen = false;
  }

  onBlur(): void {
    this.onTouched();
  }

  open(): void {
    if (this.isDisabled || this.useNative) {
      return;
    }
    this.isOpen = true;
    this.syncDisplayMonthWithValue();
  }

  toggle(): void {
    if (this.isOpen) {
      this.isOpen = false;
      return;
    }
    this.open();
  }

  prevMonth(): void {
    this.displayMonth = new Date(this.displayMonth.getFullYear(), this.displayMonth.getMonth() - 1, 1);
    this.updateCalendar();
  }

  nextMonth(): void {
    this.displayMonth = new Date(this.displayMonth.getFullYear(), this.displayMonth.getMonth() + 1, 1);
    this.updateCalendar();
  }

  onMonthChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const nextMonth = Number(target.value);
    if (Number.isNaN(nextMonth)) {
      return;
    }
    this.displayMonth = new Date(this.displayMonth.getFullYear(), nextMonth, 1);
    this.updateCalendar();
  }

  onYearChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const nextYear = Number(target.value);
    if (Number.isNaN(nextYear)) {
      return;
    }
    this.displayMonth = new Date(nextYear, this.displayMonth.getMonth(), 1);
    this.updateCalendar();
  }

  dayButtonClass(day: CxsCalendarDay): string {
    return [
      DAY_BUTTON_BASE,
      day.inMonth ? '' : DAY_OUTSIDE_MONTH,
      day.isToday ? DAY_TODAY : '',
      this.isSelected(day.date) ? DAY_SELECTED : DAY_HOVER
    ]
      .filter(Boolean)
      .join(' ');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.useNative || !this.isOpen) {
      return;
    }
    const target = event.target as HTMLElement | null;
    if (target && !target.closest(`#${this.panelId}`) && !target.closest(`[data-cxs-datepicker="${this.panelId}"]`)) {
      this.isOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.useNative || !this.isOpen) {
      return;
    }
    this.isOpen = false;
  }

  private syncDisplayMonthWithValue(): void {
    const selected = this.parseDate(this.value);
    this.displayMonth = selected ?? new Date();
    this.updateCalendar();
  }

  private updateCalendar(): void {
    const year = this.displayMonth.getFullYear();
    const month = this.displayMonth.getMonth();
    const startOfMonth = new Date(year, month, 1);
    const startDay = startOfMonth.getDay();
    const calendarStart = new Date(year, month, 1 - startDay);
    const minDate = this.parseDate(this.min);
    const maxDate = this.parseDate(this.max);
    const today = this.stripTime(new Date());

    this.calendarDays = Array.from({ length: 42 }, (_, index) => {
      const date = new Date(
        calendarStart.getFullYear(),
        calendarStart.getMonth(),
        calendarStart.getDate() + index
      );
      const dayValue = this.stripTime(date);
      const disabled =
        (minDate && dayValue < minDate) || (maxDate && dayValue > maxDate) || this.isDisabled;

      return {
        date,
        label: String(date.getDate()),
        inMonth: date.getMonth() === month,
        disabled,
        isToday: dayValue.getTime() === today.getTime(),
        key: this.formatDate(date)
      };
    });
  }

  private isSelected(date: Date): boolean {
    const selected = this.parseDate(this.value);
    if (!selected) {
      return false;
    }
    return (
      selected.getFullYear() === date.getFullYear() &&
      selected.getMonth() === date.getMonth() &&
      selected.getDate() === date.getDate()
    );
  }

  private parseDate(value?: string): Date | null {
    if (!value) {
      return null;
    }
    const [year, month, day] = value.split('-').map(Number);
    if (!year || !month || !day) {
      return null;
    }
    return new Date(year, month - 1, day);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private stripTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
