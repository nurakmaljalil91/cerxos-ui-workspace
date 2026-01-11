import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

export type CxsAlertVariant = 'info' | 'neutral' | 'danger';

const BASE_CLASSES =
  'relative flex w-full gap-3 rounded-[var(--cxs-radius-md)] border border-l-4 px-4 py-3 text-sm ' +
  'text-[var(--cxs-color-on-surface)]';

const VARIANT_CLASSES: Record<CxsAlertVariant, string> = {
  info:
    'border-[var(--cxs-color-primary)] border-l-[var(--cxs-color-primary)] ' +
    'bg-[var(--cxs-color-primary-ghost)]',
  neutral:
    'border-[var(--cxs-color-border)] border-l-[var(--cxs-color-border)] ' +
    'bg-[var(--cxs-color-surface)]',
  danger:
    'border-[var(--cxs-color-danger)] border-l-[var(--cxs-color-danger)] ' +
    'bg-[var(--cxs-color-surface)]'
};

const TITLE_BASE = 'font-semibold';

const TITLE_VARIANT: Record<CxsAlertVariant, string> = {
  info: 'text-[var(--cxs-color-primary)]',
  neutral: 'text-[var(--cxs-color-on-surface)]',
  danger: 'text-[var(--cxs-color-danger)]'
};

const CLOSE_BUTTON_CLASSES =
  'ml-auto inline-flex h-8 w-8 items-center justify-center rounded-[var(--cxs-radius-md)] ' +
  'text-[var(--cxs-color-on-surface)] transition-colors hover:bg-[var(--cxs-color-surface-hover)] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--cxs-color-focus)]';

@Component({
  selector: 'cxs-alert',
  standalone: true,
  templateUrl: './alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsAlertComponent {
  @Input() variant: CxsAlertVariant = 'info';
  @Input() title?: string;
  @Input() dismissible = false;

  @Output() closed = new EventEmitter<void>();

  isVisible = true;

  get alertClass(): string {
    return [BASE_CLASSES, VARIANT_CLASSES[this.variant]].join(' ');
  }

  get titleClass(): string {
    return [TITLE_BASE, TITLE_VARIANT[this.variant]].join(' ');
  }

  get closeButtonClass(): string {
    return CLOSE_BUTTON_CLASSES;
  }

  onClose(): void {
    this.isVisible = false;
    this.closed.emit();
  }
}
