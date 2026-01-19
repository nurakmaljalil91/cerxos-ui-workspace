import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';

export type CxsActionMenuAlign = 'start' | 'end';
export type CxsActionMenuItemTone = 'default' | 'danger';

export interface CxsActionMenuItem {
  label: string;
  value: string;
  disabled?: boolean;
  tone?: CxsActionMenuItemTone;
}

const TRIGGER_BASE_CLASSES =
  'inline-flex items-center justify-center rounded-[var(--cxs-radius-md)] p-1.5 ' +
  'text-[var(--cxs-color-on-surface-muted)] transition-colors ' +
  'hover:bg-[var(--cxs-color-surface-hover)] hover:text-[var(--cxs-color-on-surface)] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--cxs-color-focus)]';

const TRIGGER_DISABLED_CLASSES = 'pointer-events-none opacity-60';

const MENU_BASE_CLASSES =
  'min-w-[10rem] rounded-[var(--cxs-radius-md)] ' +
  'border border-[var(--cxs-color-border)] bg-[var(--cxs-color-surface)] py-1 ' +
  'shadow-[var(--cxs-shadow-sm)]';

const MENU_POSITION_CLASSES = 'absolute z-40 mt-2';
const MENU_FLOATING_CLASSES = 'fixed z-50';

const MENU_ALIGN_CLASSES: Record<CxsActionMenuAlign, string> = {
  start: 'left-0 origin-top-left',
  end: 'right-0 origin-top-right'
};

const ITEM_BASE_CLASSES =
  'flex w-full items-center gap-2 rounded-[var(--cxs-radius-sm)] px-3 py-2 text-left text-sm ' +
  'transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--cxs-color-focus)]';

const ITEM_DEFAULT_CLASSES =
  'text-[var(--cxs-color-on-surface)] hover:bg-[var(--cxs-color-surface-hover)]';
const ITEM_DANGER_CLASSES =
  'text-[var(--cxs-color-danger)] hover:bg-[var(--cxs-color-surface-hover)]';
const ITEM_DISABLED_CLASSES = 'pointer-events-none opacity-60';
const EMPTY_STATE_CLASSES = 'block px-3 py-2 text-sm text-[var(--cxs-color-on-surface-muted)]';

@Component({
  selector: 'cxs-action-menu',
  standalone: true,
  templateUrl: './action-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsActionMenuComponent {
  private static nextId = 0;

  @Input() items: CxsActionMenuItem[] = [];
  @Input() align: CxsActionMenuAlign = 'end';
  @Input() ariaLabel = 'Open actions menu';
  @Input() menuLabel = 'Actions';
  @Input() disabled = false;
  @Input() floating = false;

  @Output() itemSelected = new EventEmitter<CxsActionMenuItem>();

  @ViewChild('trigger', { read: ElementRef }) private trigger?: ElementRef<HTMLButtonElement>;
  @ViewChild('menu', { read: ElementRef }) private menu?: ElementRef<HTMLDivElement>;
  @ViewChildren('menuItem', { read: ElementRef }) private menuItems?: QueryList<ElementRef<HTMLElement>>;

  readonly menuId = `cxs-action-menu-${CxsActionMenuComponent.nextId++}`;
  isOpen = false;
  menuPosition: { top: number; left: number } | null = null;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  get triggerClass(): string {
    return [TRIGGER_BASE_CLASSES, this.disabled ? TRIGGER_DISABLED_CLASSES : ''].filter(Boolean).join(' ');
  }

  get menuClass(): string {
    return [
      MENU_BASE_CLASSES,
      this.floating ? MENU_FLOATING_CLASSES : MENU_POSITION_CLASSES,
      !this.floating ? MENU_ALIGN_CLASSES[this.align] : ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  get emptyStateClass(): string {
    return EMPTY_STATE_CLASSES;
  }

  isItemDisabled(item: CxsActionMenuItem): boolean {
    return this.disabled || !!item.disabled;
  }

  getItemClass(item: CxsActionMenuItem): string {
    return [
      ITEM_BASE_CLASSES,
      item.tone === 'danger' ? ITEM_DANGER_CLASSES : ITEM_DEFAULT_CLASSES,
      this.isItemDisabled(item) ? ITEM_DISABLED_CLASSES : ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open(): void {
    if (this.disabled) {
      return;
    }

    this.isOpen = true;
    this.updateMenuPosition();
    this.focusFirstItem();
  }

  close(): void {
    this.isOpen = false;
    this.menuPosition = null;
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.open();
    }
  }

  onMenuKeydown(event: KeyboardEvent): void {
    if (typeof document === 'undefined') {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      this.focusTrigger();
      return;
    }

    const items = this.getFocusableItems();
    if (!items.length) {
      return;
    }

    const currentIndex = items.findIndex((item) => item === document.activeElement);
    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
        nextIndex = currentIndex >= 0 ? (currentIndex + 1) % items.length : 0;
        break;
      case 'ArrowUp':
        nextIndex = currentIndex >= 0 ? (currentIndex - 1 + items.length) % items.length : items.length - 1;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = items.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    items[nextIndex]?.focus();
  }

  onItemClick(item: CxsActionMenuItem): void {
    if (this.isItemDisabled(item)) {
      return;
    }

    this.itemSelected.emit(item);
    this.close();
    this.focusTrigger();
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

  @HostListener('window:resize')
  onWindowResize(): void {
    if (!this.isOpen) {
      return;
    }

    this.updateMenuPosition();
  }

  private focusFirstItem(): void {
    if (typeof document === 'undefined') {
      return;
    }

    setTimeout(() => {
      const items = this.getFocusableItems();
      items[0]?.focus();
    }, 0);
  }

  private focusTrigger(): void {
    this.trigger?.nativeElement.focus();
  }

  private updateMenuPosition(): void {
    if (!this.floating) {
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    const trigger = this.trigger?.nativeElement;
    if (!trigger) {
      return;
    }

    const rect = trigger.getBoundingClientRect();
    const offset = 8;
    this.menuPosition = {
      top: rect.bottom + offset,
      left: rect.left
    };

    setTimeout(() => {
      const menuEl = this.menu?.nativeElement;
      const menuRect = menuEl?.getBoundingClientRect();
      if (!menuRect) {
        return;
      }

      let top = rect.bottom + offset;
      let left = this.align === 'end' ? rect.right - menuRect.width : rect.left;

      if (top + menuRect.height > window.innerHeight) {
        top = rect.top - menuRect.height - offset;
      }

      if (top < offset) {
        top = offset;
      }

      if (left + menuRect.width > window.innerWidth - offset) {
        left = Math.max(offset, window.innerWidth - menuRect.width - offset);
      }

      if (left < offset) {
        left = offset;
      }

      this.menuPosition = { top, left };
    }, 0);
  }

  private getFocusableItems(): HTMLElement[] {
    return (this.menuItems?.toArray() ?? [])
      .map((item) => item.nativeElement)
      .filter((item) => !item.hasAttribute('disabled') && !item.hasAttribute('data-disabled'));
  }
}
