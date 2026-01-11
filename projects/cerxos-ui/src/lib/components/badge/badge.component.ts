import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type CxsBadgeVariant = 'primary' | 'neutral' | 'danger';
export type CxsBadgeSize = 'sm' | 'md';

const BASE_CLASSES =
  'inline-flex items-center gap-1 rounded-[var(--cxs-radius-md)] border px-2.5 py-0.5 text-xs font-medium ' +
  'leading-none';

const VARIANT_CLASSES: Record<CxsBadgeVariant, string> = {
  primary:
    'border-[var(--cxs-color-primary)] bg-[var(--cxs-color-primary-ghost)] ' +
    'text-[var(--cxs-color-primary)]',
  neutral:
    'border-[var(--cxs-color-border)] bg-[var(--cxs-color-surface)] ' +
    'text-[var(--cxs-color-on-surface)]',
  danger:
    'border-[var(--cxs-color-danger)] bg-[var(--cxs-color-surface)] ' +
    'text-[var(--cxs-color-danger)]'
};

const SIZE_CLASSES: Record<CxsBadgeSize, string> = {
  sm: 'text-[11px]',
  md: 'text-xs'
};

@Component({
  selector: 'cxs-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsBadgeComponent {
  @Input() variant: CxsBadgeVariant = 'primary';
  @Input() size: CxsBadgeSize = 'md';

  get badgeClass(): string {
    return [BASE_CLASSES, VARIANT_CLASSES[this.variant], SIZE_CLASSES[this.size]].join(' ');
  }
}
