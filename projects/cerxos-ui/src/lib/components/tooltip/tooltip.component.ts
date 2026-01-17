import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input
} from '@angular/core';

export type CxsTooltipPosition = 'top' | 'right' | 'bottom' | 'left';

const WRAPPER_CLASSES = 'relative inline-flex';
const TOOLTIP_BASE_CLASSES =
  'pointer-events-none absolute z-50 max-w-xs rounded-[var(--cxs-radius-md)] px-2 py-1 text-xs ' +
  'text-[var(--cxs-color-on-primary)] bg-[var(--cxs-color-on-surface)] shadow-[var(--cxs-shadow-sm)]';

const TOOLTIP_POSITION_CLASSES: Record<CxsTooltipPosition, string> = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2'
};

@Component({
  selector: 'cxs-tooltip',
  standalone: true,
  templateUrl: './tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsTooltipComponent {
  private static nextId = 0;

  @Input() text = '';
  @Input() position: CxsTooltipPosition = 'top';
  @Input() disabled = false;

  open = false;
  readonly tooltipId = `cxs-tooltip-${CxsTooltipComponent.nextId++}`;

  get wrapperClass(): string {
    return WRAPPER_CLASSES;
  }

  get tooltipClass(): string {
    return [TOOLTIP_BASE_CLASSES, TOOLTIP_POSITION_CLASSES[this.position]].join(' ');
  }

  get describedBy(): string | null {
    if (!this.text || this.disabled) {
      return null;
    }

    return this.tooltipId;
  }

  show(): void {
    if (this.disabled || !this.text) {
      return;
    }

    this.open = true;
  }

  hide(): void {
    this.open = false;
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.show();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hide();
  }

  @HostListener('focusin')
  onFocusIn(): void {
    this.show();
  }

  @HostListener('focusout')
  onFocusOut(): void {
    this.hide();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.hide();
    }
  }
}
