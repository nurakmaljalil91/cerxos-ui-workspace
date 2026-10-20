import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type CxsRadioChipTone = 'primary' | 'danger' | 'neutral';
export type CxsRadioChipSize = 'sm' | 'md' | 'lg';

export interface CxsRadioChipOption {
  label: string;
  value: string;
  tone: CxsRadioChipTone;
}

const CHIP_BASE =
  'inline-flex items-center gap-2 rounded-[var(--cxs-radius-md)] border ' +
  'font-medium transition-colors cursor-pointer select-none ' +
  'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 ' +
  'peer-focus-visible:outline-[var(--cxs-color-focus)]';

const TONE_CLASSES: Record<CxsRadioChipTone, string> = {
  primary:
    'border-[var(--cxs-color-primary)] bg-[var(--cxs-color-primary-ghost)] ' +
    'text-[var(--cxs-color-primary)]',
  danger:
    'border-[var(--cxs-color-danger)] bg-[var(--cxs-color-danger-surface)] ' +
    'text-[var(--cxs-color-danger)]',
  neutral:
    'border-[var(--cxs-color-border)] bg-[var(--cxs-color-surface)] ' +
    'text-[var(--cxs-color-on-surface)]'
};

const SELECTED_CLASSES = 'ring-2 ring-offset-2 ring-current';
const SIZE_CLASSES: Record<CxsRadioChipSize, string> = {
  sm: 'min-h-8 px-3 py-1 text-xs',
  md: 'min-h-10 px-4 py-2 text-sm',
  lg: 'min-h-12 px-5 py-2.5 text-base'
};

@Component({
  selector: 'cxs-radio-chip-group',
  standalone: true,
  templateUrl: './radio-chip-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CxsRadioChipGroupComponent),
      multi: true
    }
  ]
})
export class CxsRadioChipGroupComponent implements ControlValueAccessor {
  private static nextId = 0;

  @Input() label = '';
  @Input() options: readonly CxsRadioChipOption[] = [];
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() size: CxsRadioChipSize = 'md';

  @Output() valueChange = new EventEmitter<string>();

  readonly groupId = `cxs-radio-chip-group-${CxsRadioChipGroupComponent.nextId++}`;
  value: string | null = null;
  private disabledFromControl = false;
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private readonly changeDetector: ChangeDetectorRef) {}

  get isDisabled(): boolean {
    return this.disabled || this.disabledFromControl;
  }

  chipClass(option: CxsRadioChipOption): string {
    return [
      CHIP_BASE,
      SIZE_CLASSES[this.size],
      TONE_CLASSES[option.tone],
      this.value === option.value ? SELECTED_CLASSES : '',
      this.invalid ? 'outline outline-1 outline-[var(--cxs-color-danger)]' : '',
      this.isDisabled ? 'cursor-not-allowed opacity-60' : ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  writeValue(value: string | null): void {
    this.value = value ?? null;
    this.changeDetector.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabledFromControl = disabled;
    this.changeDetector.markForCheck();
  }

  select(value: string): void {
    if (this.isDisabled) return;
    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }

  markTouched(): void {
    this.onTouched();
  }
}
