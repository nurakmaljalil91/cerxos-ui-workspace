import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type CxsCardVariant = 'surface' | 'muted' | 'outline';
export type CxsCardSize = 'sm' | 'md' | 'lg';

const BASE_CLASSES =
  'rounded-[var(--cxs-radius-md)] border border-[var(--cxs-color-border)] ' +
  'bg-[var(--cxs-color-surface)] text-[var(--cxs-color-on-surface)]';

const VARIANT_CLASSES: Record<CxsCardVariant, string> = {
  surface: 'bg-[var(--cxs-color-surface)]',
  muted: 'bg-[var(--cxs-color-surface-hover)]',
  outline: 'bg-transparent'
};

const SIZE_CLASSES: Record<CxsCardSize, string> = {
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7'
};

@Component({
  selector: 'cxs-card',
  standalone: true,
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsCardComponent {
  @Input() variant: CxsCardVariant = 'surface';
  @Input() size: CxsCardSize = 'md';
  @Input() elevated = true;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledby?: string;

  get cardClass(): string {
    return [
      BASE_CLASSES,
      VARIANT_CLASSES[this.variant],
      SIZE_CLASSES[this.size],
      this.elevated ? 'shadow-[var(--cxs-shadow-sm)]' : ''
    ]
      .filter(Boolean)
      .join(' ');
  }
}
