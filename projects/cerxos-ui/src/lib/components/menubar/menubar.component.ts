import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';

export type CxsMenubarSize = 'sm' | 'md' | 'lg';
export type CxsMenubarVariant = 'default' | 'surface';

export interface CxsMenubarItem {
  label: string;
  href?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  disabled?: boolean;
  active?: boolean;
}

const BAR_BASE_CLASSES =
  'm-0 flex list-none flex-wrap items-center gap-1 rounded-[var(--cxs-radius-md)] border border-transparent p-1';

const BAR_SIZE_CLASSES: Record<CxsMenubarSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base'
};

const BAR_VARIANT_CLASSES: Record<CxsMenubarVariant, string> = {
  default: 'bg-transparent',
  surface:
    'bg-[var(--cxs-color-surface)] border-[var(--cxs-color-border)] shadow-[var(--cxs-shadow-sm)]'
};

const ITEM_BASE_CLASSES =
  'inline-flex items-center gap-2 rounded-[var(--cxs-radius-md)] px-3 py-1.5 font-medium ' +
  'transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--cxs-color-focus)]';

const ITEM_SIZE_CLASSES: Record<CxsMenubarSize, string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base'
};

const ITEM_ACTIVE_CLASSES =
  'bg-[var(--cxs-color-primary-ghost)] text-[var(--cxs-color-primary)]';
const ITEM_INACTIVE_CLASSES =
  'text-[var(--cxs-color-on-surface)] hover:bg-[var(--cxs-color-surface-hover)]';
const ITEM_DISABLED_CLASSES =
  'text-[var(--cxs-color-on-surface-muted)] opacity-60 pointer-events-none';

@Component({
  selector: 'cxs-menubar',
  standalone: true,
  templateUrl: './menubar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsMenubarComponent {
  @Input() items: CxsMenubarItem[] = [];
  @Input() ariaLabel = 'Menubar';
  @Input() size: CxsMenubarSize = 'md';
  @Input() variant: CxsMenubarVariant = 'default';
  @Input() disabled = false;

  @Output() itemSelected = new EventEmitter<CxsMenubarItem>();

  @ViewChildren('menuItem', { read: ElementRef })
  private readonly menuItems?: QueryList<ElementRef<HTMLElement>>;

  constructor(@Attribute('class') private readonly hostClass: string | null) {}

  get menubarClass(): string {
    return [
      BAR_BASE_CLASSES,
      BAR_SIZE_CLASSES[this.size],
      BAR_VARIANT_CLASSES[this.variant],
      this.hostClass
    ]
      .filter(Boolean)
      .join(' ');
  }

  isItemDisabled(item: CxsMenubarItem): boolean {
    return this.disabled || !!item.disabled;
  }

  getItemClass(item: CxsMenubarItem): string {
    return [
      ITEM_BASE_CLASSES,
      ITEM_SIZE_CLASSES[this.size],
      item.active ? ITEM_ACTIVE_CLASSES : ITEM_INACTIVE_CLASSES,
      this.isItemDisabled(item) ? ITEM_DISABLED_CLASSES : ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  getItemHref(item: CxsMenubarItem): string | null {
    if (item.href && !this.isItemDisabled(item)) {
      return item.href;
    }

    return null;
  }

  getItemRel(item: CxsMenubarItem): string | null {
    if (item.target === '_blank') {
      return item.rel ?? 'noopener noreferrer';
    }

    return item.rel ?? null;
  }

  onItemClick(item: CxsMenubarItem, event: Event): void {
    if (this.isItemDisabled(item)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.itemSelected.emit(item);
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }

    if (typeof document === 'undefined') {
      return;
    }

    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(event.key)) {
      return;
    }

    const items = this.getFocusableItems();
    if (!items.length) {
      return;
    }

    const currentIndex = items.findIndex((item) => item === document.activeElement);
    let nextIndex = 0;

    switch (event.key) {
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = items.length - 1;
        break;
      case 'ArrowRight':
        nextIndex = currentIndex >= 0 ? (currentIndex + 1) % items.length : 0;
        break;
      case 'ArrowLeft':
        nextIndex = currentIndex >= 0 ? (currentIndex - 1 + items.length) % items.length : items.length - 1;
        break;
    }

    items[nextIndex]?.focus();
    event.preventDefault();
  }

  private getFocusableItems(): HTMLElement[] {
    return (this.menuItems?.toArray() ?? [])
      .map((item) => item.nativeElement)
      .filter((item) => !item.hasAttribute('data-disabled'));
  }
}
