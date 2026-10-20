import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  forwardRef,
  inject
} from '@angular/core';

export type CxsHoverCardSide = 'top' | 'right' | 'bottom' | 'left';
export type CxsHoverCardAlign = 'start' | 'center' | 'end';

const CONTENT_BASE_CLASSES =
  'absolute z-50 w-80 max-w-[calc(100vw-2rem)] rounded-[var(--cxs-radius-md)] ' +
  'border border-[var(--cxs-color-border)] bg-[var(--cxs-color-surface)] p-4 ' +
  'text-sm text-[var(--cxs-color-on-surface)] shadow-[var(--cxs-shadow-sm)]';

const SIDE_CLASSES: Record<CxsHoverCardSide, string> = {
  top: 'bottom-full mb-2',
  right: 'left-full ml-2',
  bottom: 'top-full mt-2',
  left: 'right-full mr-2'
};

const ALIGN_CLASSES: Record<CxsHoverCardSide, Record<CxsHoverCardAlign, string>> = {
  top: { start: 'left-0', center: 'left-1/2 -translate-x-1/2', end: 'right-0' },
  bottom: { start: 'left-0', center: 'left-1/2 -translate-x-1/2', end: 'right-0' },
  left: { start: 'top-0', center: 'top-1/2 -translate-y-1/2', end: 'bottom-0' },
  right: { start: 'top-0', center: 'top-1/2 -translate-y-1/2', end: 'bottom-0' }
};

@Component({
  selector: 'cxs-hover-card',
  standalone: true,
  templateUrl: './hover-card.component.html',
  host: { class: 'relative inline-flex' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsHoverCardComponent implements OnDestroy {
  private static nextId = 0;

  @Input() openDelay = 200;
  @Input() closeDelay = 200;
  @ContentChild(forwardRef(() => CxsHoverCardTriggerDirective))
  private trigger?: CxsHoverCardTriggerDirective;

  readonly contentId = `cxs-hover-card-${CxsHoverCardComponent.nextId++}`;
  open = false;

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private openTimer?: ReturnType<typeof setTimeout>;
  private closeTimer?: ReturnType<typeof setTimeout>;
  private pointerInside = false;
  private focusInside = false;
  private suppressFocusOpen = false;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.pointerInside = true;
    this.scheduleOpen();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.pointerInside = false;
    if (!this.focusInside) {
      this.scheduleClose();
    }
  }

  @HostListener('focusin')
  onFocusIn(): void {
    this.focusInside = true;
    if (this.suppressFocusOpen) {
      this.suppressFocusOpen = false;
      return;
    }
    this.cancelOpen();
    this.cancelClose();
    this.setOpen(true);
  }

  @HostListener('focusout', ['$event'])
  onFocusOut(event: FocusEvent): void {
    if (event.relatedTarget && this.host.nativeElement.contains(event.relatedTarget as Node)) {
      return;
    }

    this.focusInside = false;
    this.suppressFocusOpen = false;
    if (!this.pointerInside) {
      this.scheduleClose();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.open) {
      event.preventDefault();
      this.cancelOpen();
      this.cancelClose();
      this.setOpen(false);

      const trigger = this.trigger?.element.nativeElement;
      if (trigger && !trigger.contains(event.target as Node)) {
        this.suppressFocusOpen = true;
        trigger.focus();
      }
    }
  }

  ngOnDestroy(): void {
    this.cancelOpen();
    this.cancelClose();
  }

  private scheduleOpen(): void {
    this.cancelClose();
    if (this.open || this.openTimer) {
      return;
    }

    this.openTimer = setTimeout(() => {
      this.openTimer = undefined;
      this.setOpen(true);
    }, Math.max(0, this.openDelay));
  }

  private scheduleClose(): void {
    this.cancelOpen();
    if (!this.open || this.closeTimer) {
      return;
    }

    this.closeTimer = setTimeout(() => {
      this.closeTimer = undefined;
      this.setOpen(false);
    }, Math.max(0, this.closeDelay));
  }

  private cancelOpen(): void {
    clearTimeout(this.openTimer);
    this.openTimer = undefined;
  }

  private cancelClose(): void {
    clearTimeout(this.closeTimer);
    this.closeTimer = undefined;
  }

  private setOpen(open: boolean): void {
    this.open = open;
    this.changeDetector.markForCheck();
  }
}

@Directive({
  selector: '[cxsHoverCardTrigger]',
  standalone: true,
  host: {
    class:
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
      'focus-visible:outline-[var(--cxs-color-focus)]',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'card.open',
    '[attr.aria-controls]': 'card.contentId'
  }
})
export class CxsHoverCardTriggerDirective {
  readonly card = inject(CxsHoverCardComponent);
  readonly element = inject(ElementRef<HTMLElement>);
}

@Directive({
  selector: '[cxsHoverCardContent]',
  standalone: true,
  host: {
    '[class]': 'contentClass',
    '[attr.id]': 'card.contentId',
    '[attr.role]': '"dialog"',
    '[attr.aria-label]': 'ariaLabel',
    '[attr.aria-hidden]': 'card.open ? null : "true"',
    '[attr.hidden]': 'card.open ? null : ""'
  }
})
export class CxsHoverCardContentDirective {
  @Input() side: CxsHoverCardSide = 'bottom';
  @Input() align: CxsHoverCardAlign = 'center';
  @Input() ariaLabel = 'Preview';

  readonly card = inject(CxsHoverCardComponent);

  get contentClass(): string {
    return [
      CONTENT_BASE_CLASSES,
      SIDE_CLASSES[this.side],
      ALIGN_CLASSES[this.side][this.align],
      this.card.open ? '' : 'hidden'
    ]
      .filter(Boolean)
      .join(' ');
  }
}
