import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type CxsAccordionSpacing = 'sm' | 'md' | 'lg';

const BASE_CLASSES = 'grid';
const SPACING_CLASSES: Record<CxsAccordionSpacing, string> = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4'
};

@Component({
  selector: 'cxs-accordion',
  standalone: true,
  templateUrl: './accordion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsAccordionComponent {
  @Input() spacing: CxsAccordionSpacing = 'md';

  get accordionClass(): string {
    return [BASE_CLASSES, SPACING_CLASSES[this.spacing]].join(' ');
  }
}
