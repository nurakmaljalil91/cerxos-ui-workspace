import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[cxsTabLabel]',
  standalone: true
})
export class CxsTabLabelDirective {
  constructor(public readonly templateRef: TemplateRef<unknown>) {}
}
