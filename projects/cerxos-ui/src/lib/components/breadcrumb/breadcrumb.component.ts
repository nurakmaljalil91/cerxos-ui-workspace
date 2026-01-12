import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type CxsBreadcrumbSize = 'sm' | 'md' | 'lg';
export type CxsBreadcrumbVariant = 'default' | 'muted';

export interface CxsBreadcrumbItem {
  label: string;
  href?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

const BASE_CLASSES = 'flex flex-wrap items-center gap-x-1 gap-y-1';
const ITEM_CLASSES = 'flex items-center gap-1';
const LINK_BASE_CLASSES =
  'rounded-[var(--cxs-radius-md)] transition-colors focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-[var(--cxs-color-focus)]';
const NON_LINK_CLASSES = 'text-[var(--cxs-color-on-surface-muted)]';
const SEPARATOR_CLASSES = 'text-[var(--cxs-color-on-surface-muted)] select-none';
const DISABLED_CLASSES = 'text-[var(--cxs-color-on-surface-muted)] opacity-60';

const SIZE_CLASSES: Record<CxsBreadcrumbSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base'
};

const LINK_VARIANT_CLASSES: Record<CxsBreadcrumbVariant, string> = {
  default:
    'text-[var(--cxs-color-primary)] hover:text-[var(--cxs-color-primary-hover)]',
  muted:
    'text-[var(--cxs-color-on-surface-muted)] hover:text-[var(--cxs-color-on-surface)]'
};

const CURRENT_VARIANT_CLASSES: Record<CxsBreadcrumbVariant, string> = {
  default: 'text-[var(--cxs-color-on-surface)]',
  muted: 'text-[var(--cxs-color-on-surface-muted)]'
};

@Component({
  selector: 'cxs-breadcrumb',
  standalone: true,
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsBreadcrumbComponent {
  @Input() items: CxsBreadcrumbItem[] = [];
  @Input() separator = '/';
  @Input() ariaLabel = 'Breadcrumb';
  @Input() size: CxsBreadcrumbSize = 'md';
  @Input() variant: CxsBreadcrumbVariant = 'default';
  @Input() disabled = false;

  get listClass(): string {
    return [BASE_CLASSES, SIZE_CLASSES[this.size], this.disabled ? 'opacity-60' : '']
      .filter(Boolean)
      .join(' ');
  }

  get itemClass(): string {
    return ITEM_CLASSES;
  }

  get separatorClass(): string {
    return SEPARATOR_CLASSES;
  }

  isLink(item: CxsBreadcrumbItem, isLast: boolean): boolean {
    return !!item.href && !isLast && !item.disabled && !this.disabled;
  }

  getLinkClass(item: CxsBreadcrumbItem): string {
    return [
      LINK_BASE_CLASSES,
      LINK_VARIANT_CLASSES[this.variant],
      item.disabled || this.disabled ? DISABLED_CLASSES : ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  getLabelClass(item: CxsBreadcrumbItem, isLast: boolean): string {
    if (isLast) {
      return [
        CURRENT_VARIANT_CLASSES[this.variant],
        item.disabled || this.disabled ? DISABLED_CLASSES : ''
      ]
        .filter(Boolean)
        .join(' ');
    }

    return [NON_LINK_CLASSES, item.disabled || this.disabled ? DISABLED_CLASSES : '']
      .filter(Boolean)
      .join(' ');
  }

  getItemRel(item: CxsBreadcrumbItem): string | null {
    if (item.target === '_blank') {
      return item.rel ?? 'noopener noreferrer';
    }

    return item.rel ?? null;
  }
}
