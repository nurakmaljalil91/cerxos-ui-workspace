import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';

export type CxsToastVariant = 'info' | 'neutral' | 'danger';
export type CxsToastCloseReason = 'dismiss' | 'timeout';
export type CxsToastPosition =
  | 'bottom-right'
  | 'bottom'
  | 'bottom-left'
  | 'top-right'
  | 'top'
  | 'top-left'
  | 'right'
  | 'left'
  | 'center';
export type CxsToastMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'none';

const HOST_BASE_CLASSES = 'pointer-events-none';
const POSITION_CLASSES: Record<CxsToastPosition, string> = {
  'bottom-right': 'fixed bottom-6 right-6 items-end',
  bottom: 'fixed bottom-6 left-1/2 -translate-x-1/2 items-end',
  'bottom-left': 'fixed bottom-6 left-6 items-start',
  'top-right': 'fixed top-6 right-6 items-end',
  top: 'fixed top-6 left-1/2 -translate-x-1/2 items-start',
  'top-left': 'fixed top-6 left-6 items-start',
  right: 'fixed right-6 top-1/2 -translate-y-1/2 items-end',
  left: 'fixed left-6 top-1/2 -translate-y-1/2 items-start',
  center: 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center'
};

const BASE_CLASSES =
  'pointer-events-auto flex w-full items-start gap-3 rounded-[var(--cxs-radius-md)] ' +
  'border px-4 py-3 shadow-[var(--cxs-shadow-sm)]';

const WIDTH_CLASSES: Record<CxsToastMaxWidth, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  none: 'max-w-none'
};

const VARIANT_CLASSES: Record<CxsToastVariant, string> = {
  info:
    'border-[var(--cxs-color-primary)] bg-[var(--cxs-color-primary-ghost)] ' +
    'text-[var(--cxs-color-on-surface)]',
  neutral:
    'border-[var(--cxs-color-border)] bg-[var(--cxs-color-surface)] ' +
    'text-[var(--cxs-color-on-surface)]',
  danger:
    'border-[var(--cxs-color-danger)] bg-[var(--cxs-color-surface)] ' +
    'text-[var(--cxs-color-on-surface)]'
};

const TITLE_CLASSES = 'text-sm font-semibold';
const MESSAGE_CLASSES = 'mt-1 text-sm text-[var(--cxs-color-on-surface-muted)]';
const ACTIONS_CLASSES = 'mt-3 flex flex-wrap items-center gap-2 empty:hidden';
const CLOSE_BUTTON_CLASSES =
  'inline-flex h-8 w-8 items-center justify-center rounded-[var(--cxs-radius-md)] ' +
  'text-[var(--cxs-color-on-surface)] transition-colors hover:bg-[var(--cxs-color-surface-hover)] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--cxs-color-focus)]';

@Component({
  selector: 'cxs-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsToastComponent implements OnChanges, OnDestroy {
  @Input() open = false;
  @Input() title?: string;
  @Input() message?: string;
  @Input() ariaLabel = 'Notification';
  @Input() variant: CxsToastVariant = 'info';
  @Input() dismissible = true;
  @Input() duration = 0;
  @Input() position: CxsToastPosition = 'bottom-right';
  @Input() maxWidth: CxsToastMaxWidth = 'sm';

  @Output() openChange = new EventEmitter<boolean>();
  @Output() dismissed = new EventEmitter<CxsToastCloseReason>();

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(@Attribute('class') private readonly hostClass: string | null) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] || changes['duration']) {
      this.resetTimer();
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  get hostClassName(): string {
    return [HOST_BASE_CLASSES, POSITION_CLASSES[this.position]].join(' ');
  }

  get toastClass(): string {
    return [
      BASE_CLASSES,
      WIDTH_CLASSES[this.maxWidth],
      VARIANT_CLASSES[this.variant],
      this.hostClass
    ]
      .filter(Boolean)
      .join(' ');
  }

  get titleClass(): string {
    return TITLE_CLASSES;
  }

  get messageClass(): string {
    return MESSAGE_CLASSES;
  }

  get actionsClass(): string {
    return ACTIONS_CLASSES;
  }

  get closeButtonClass(): string {
    return CLOSE_BUTTON_CLASSES;
  }

  get role(): 'status' | 'alert' {
    return this.variant === 'danger' ? 'alert' : 'status';
  }

  get ariaLive(): 'polite' | 'assertive' {
    return this.variant === 'danger' ? 'assertive' : 'polite';
  }

  get ariaLabelValue(): string | null {
    if (this.title) {
      return null;
    }

    return this.ariaLabel;
  }

  requestClose(reason: CxsToastCloseReason): void {
    this.openChange.emit(false);
    this.dismissed.emit(reason);
  }

  private resetTimer(): void {
    this.clearTimer();

    if (this.open && this.duration > 0) {
      this.timeoutId = setTimeout(() => {
        this.requestClose('timeout');
      }, this.duration);
    }
  }

  private clearTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
