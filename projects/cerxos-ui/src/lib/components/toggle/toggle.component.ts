import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

export type CxsToggleSize = 'sm' | 'md' | 'lg';

const WRAPPER_CLASSES = 'inline-flex items-center gap-2';
const LABEL_BASE_CLASSES = 'text-sm text-[var(--cxs-color-on-surface)] select-none';
const LABEL_DISABLED_CLASSES = 'text-[var(--cxs-color-on-surface-muted)]';

const TRACK_BASE_CLASSES =
  'relative inline-flex items-center rounded-full border transition-colors ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--cxs-color-focus)] disabled:pointer-events-none disabled:opacity-60';

const TRACK_SIZE_CLASSES: Record<CxsToggleSize, string> = {
  sm: 'h-6 w-11 p-0.5',
  md: 'h-6 w-11 p-0.5',
  lg: 'h-6 w-11 p-0.5'
};

const TRACK_STATE_CLASSES = {
  on: 'bg-[var(--cxs-color-primary)] border-[var(--cxs-color-primary)]',
  off: 'bg-[var(--cxs-color-surface-hover)] border-[var(--cxs-color-border)]'
};

const THUMB_BASE_CLASSES =
  'absolute left-0.5 top-1/2 -translate-y-1/2 rounded-full transition-transform duration-200 ease-out';

const THUMB_SIZE_CLASSES: Record<CxsToggleSize, string> = {
  sm: 'h-5 w-5',
  md: 'h-5 w-5',
  lg: 'h-5 w-5'
};

const THUMB_STATE_CLASSES = {
  on: {
    sm: 'translate-x-[20px] bg-[var(--cxs-color-on-primary)]',
    md: 'translate-x-[20px] bg-[var(--cxs-color-on-primary)]',
    lg: 'translate-x-[20px] bg-[var(--cxs-color-on-primary)]'
  },
  off: 'translate-x-0 bg-[var(--cxs-color-surface)]'
};

@Component({
  selector: 'cxs-toggle',
  standalone: true,
  templateUrl: './toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsToggleComponent {
  private static nextId = 0;

  @Input() checked = false;
  @Input() disabled = false;
  @Input() size: CxsToggleSize = 'md';
  @Input() label?: string;
  @Input() ariaLabel = 'Toggle';

  @Output() checkedChange = new EventEmitter<boolean>();

  readonly labelId = `cxs-toggle-label-${CxsToggleComponent.nextId++}`;

  get wrapperClass(): string {
    return WRAPPER_CLASSES;
  }

  get labelClass(): string {
    return [LABEL_BASE_CLASSES, this.disabled ? LABEL_DISABLED_CLASSES : '']
      .filter(Boolean)
      .join(' ');
  }

  get trackClass(): string {
    return [
      TRACK_BASE_CLASSES,
      TRACK_SIZE_CLASSES[this.size],
      this.checked ? TRACK_STATE_CLASSES.on : TRACK_STATE_CLASSES.off
    ].join(' ');
  }

  get thumbClass(): string {
    const thumbState = this.checked
      ? THUMB_STATE_CLASSES.on[this.size]
      : THUMB_STATE_CLASSES.off;

    return [THUMB_BASE_CLASSES, THUMB_SIZE_CLASSES[this.size], thumbState].join(' ');
  }

  get ariaLabelValue(): string | null {
    if (this.label) {
      return null;
    }

    return this.ariaLabel;
  }

  toggle(): void {
    if (this.disabled) {
      return;
    }

    this.checkedChange.emit(!this.checked);
  }
}
