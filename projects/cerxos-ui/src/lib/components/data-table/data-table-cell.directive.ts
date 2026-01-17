import { Directive, Input, TemplateRef } from '@angular/core';
import type { CxsDataTableColumn } from './data-table.component';

export interface CxsDataTableCellContext {
  $implicit: Record<string, unknown>;
  value: unknown;
  column: CxsDataTableColumn;
}

@Directive({
  selector: '[cxsDataTableCell]',
  standalone: true
})
export class CxsDataTableCellDirective {
  @Input('cxsDataTableCell') columnKey = '';

  constructor(public readonly template: TemplateRef<CxsDataTableCellContext>) {}
}
