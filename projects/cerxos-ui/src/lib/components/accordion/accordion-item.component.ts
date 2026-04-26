import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';


export type CxsAccordionItemSize = 'sm' | 'md' | 'lg';

const ITEM_BASE =
  'rounded-[var(--cxs-radius-md)] border border-[var(--cxs-color-border)] ' +
  'bg-[var(--cxs-color-surface)] text-[var(--cxs-color-on-surface)]';
const ITEM_DISABLED = 'opacity-60';

const HEADER_BASE =
  'flex w-full items-center justify-between gap-3 text-left font-medium transition-colors ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--cxs-color-focus)]';
const HEADER_HOVER = 'hover:bg-[var(--cxs-color-surface-hover)]';
const HEADER_DISABLED = 'cursor-not-allowed';

const CONTENT_BASE = 'text-(--cxs-color-on-surface-muted)';

const SIZE_HEADER_CLASSES: Record<CxsAccordionItemSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-sm',
  lg: 'px-5 py-4 text-base'
};

const SIZE_CONTENT_CLASSES: Record<CxsAccordionItemSize, string> = {
  sm: 'px-3 pb-3 text-sm',
  md: 'px-4 pb-4 text-sm',
  lg: 'px-5 pb-5 text-base'
};

@Component({
  selector: 'cxs-accordion-item',
  standalone: true,
  imports: [],
  templateUrl: './accordion-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsAccordionItemComponent {
  private static nextId = 0;

  @Input() title?: string;
  @Input() expanded = false;
  @Input() disabled = false;
  @Input() size: CxsAccordionItemSize = 'md';

  @Output() expandedChange = new EventEmitter<boolean>();

  readonly buttonId = `cxs-accordion-button-${++CxsAccordionItemComponent.nextId}`;
  readonly contentId = `cxs-accordion-panel-${CxsAccordionItemComponent.nextId}`;

  get itemClass(): string {
    return [ITEM_BASE, this.disabled ? ITEM_DISABLED : ''].filter(Boolean).join(' ');
  }

  get headerClass(): string {
    return [
      HEADER_BASE,
      SIZE_HEADER_CLASSES[this.size],
      this.disabled ? HEADER_DISABLED : HEADER_HOVER
    ]
      .filter(Boolean)
      .join(' ');
  }

  get contentClass(): string {
    return [CONTENT_BASE, SIZE_CONTENT_CLASSES[this.size]].join(' ');
  }

  get iconClass(): string {
    return [
      'h-4 w-4 shrink-0 text-(--cxs-color-on-surface-muted) transition-transform',
      this.expanded ? 'rotate-180' : ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  toggle(): void {
    if (this.disabled) {
      return;
    }

    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }
}
