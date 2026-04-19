import {
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

export type CxsDialogSize = 'sm' | 'md' | 'lg';
export type CxsDialogCloseReason = 'dismiss' | 'backdrop' | 'escape';

const OVERLAY_CLASSES =
  'cxs-dialog-overlay fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.45)] p-4';
const PANEL_BASE_CLASSES =
  'cxs-dialog-panel w-full rounded-[var(--cxs-radius-md)] border border-[var(--cxs-color-border)] ' +
  'bg-[var(--cxs-color-surface)] text-[var(--cxs-color-on-surface)] shadow-[var(--cxs-shadow-sm)] ' +
  'p-6 outline-none';

const PANEL_SIZE_CLASSES: Record<CxsDialogSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl'
};

const TITLE_CLASSES = 'text-lg font-semibold';
const DESCRIPTION_CLASSES = 'mt-1 text-sm text-[var(--cxs-color-on-surface-muted)]';
const BODY_CLASSES = 'mt-4 text-sm text-[var(--cxs-color-on-surface)]';
const ACTIONS_CLASSES =
  'mt-6 flex flex-wrap items-center justify-end gap-2 ' +
  '[&>*]:flex [&>*]:flex-wrap [&>*]:items-center [&>*]:justify-end [&>*]:gap-2';
const CLOSE_BUTTON_CLASSES =
  'inline-flex h-8 w-8 items-center justify-center rounded-[var(--cxs-radius-md)] ' +
  'text-[var(--cxs-color-on-surface)] transition-colors hover:bg-[var(--cxs-color-surface-hover)] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--cxs-color-focus)]';

@Component({
  selector: 'cxs-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsDialogComponent implements OnChanges, AfterViewInit {
  private static nextId = 0;

  @Input() open = false;
  @Input() title?: string;
  @Input() description?: string;
  @Input() ariaLabel = 'Dialog';
  @Input() size: CxsDialogSize = 'md';
  @Input() dismissible = true;
  @Input() closeOnBackdrop = true;
  @Input() closeOnEscape = true;

  @Output() openChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<CxsDialogCloseReason>();

  @ViewChild('dialogPanel') private readonly dialogPanel?: ElementRef<HTMLElement>;

  readonly titleId = `cxs-dialog-title-${CxsDialogComponent.nextId++}`;
  readonly descriptionId = `cxs-dialog-description-${CxsDialogComponent.nextId++}`;

  constructor(@Attribute('class') private readonly hostClass: string | null) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue) {
      this.focusPanelSoon();
    }
  }

  ngAfterViewInit(): void {
    if (this.open) {
      this.focusPanelSoon();
    }
  }

  get overlayClass(): string {
    return OVERLAY_CLASSES;
  }

  get panelClass(): string {
    return [PANEL_BASE_CLASSES, PANEL_SIZE_CLASSES[this.size], this.hostClass]
      .filter(Boolean)
      .join(' ');
  }

  get titleClass(): string {
    return TITLE_CLASSES;
  }

  get descriptionClass(): string {
    return DESCRIPTION_CLASSES;
  }

  get bodyClass(): string {
    return BODY_CLASSES;
  }

  get actionsClass(): string {
    return ACTIONS_CLASSES;
  }

  get closeButtonClass(): string {
    return CLOSE_BUTTON_CLASSES;
  }

  get ariaLabelValue(): string | null {
    if (this.title) {
      return null;
    }

    return this.ariaLabel;
  }

  requestClose(reason: CxsDialogCloseReason): void {
    this.openChange.emit(false);
    this.closed.emit(reason);
  }

  onBackdropClick(event: MouseEvent): void {
    if (!this.closeOnBackdrop || !this.open) {
      return;
    }

    if (event.target === event.currentTarget) {
      this.requestClose('backdrop');
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (!this.closeOnEscape || !this.open) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.requestClose('escape');
    }
  }

  private focusPanelSoon(): void {
    queueMicrotask(() => {
      this.dialogPanel?.nativeElement.focus();
    });
  }
}
