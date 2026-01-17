import { Attribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type CxsTableAlign = 'left' | 'center' | 'right';

export interface CxsTableColumn {
  key: string;
  label: string;
  align?: CxsTableAlign;
  width?: string;
  headerClass?: string;
  cellClass?: string;
}

const WRAPPER_BASE_CLASSES = 'w-full overflow-hidden';
const WRAPPER_BORDERED_CLASSES =
  'rounded-[var(--cxs-radius-md)] border border-[var(--cxs-color-border)]';

const TABLE_BASE_CLASSES = 'w-full border-collapse text-sm text-[var(--cxs-color-on-surface)]';
const TABLE_COMPACT_CLASSES = 'text-xs';

const HEADER_ROW_CLASSES =
  'border-b border-[var(--cxs-color-border)] text-xs uppercase tracking-[0.2em] ' +
  'text-[var(--cxs-color-on-surface-muted)]';
const HEADER_CELL_BASE_CLASSES = 'px-3 py-2 text-left font-semibold';

const BODY_ROW_BASE_CLASSES = 'border-b border-[var(--cxs-color-border)] last:border-b-0';
const BODY_ROW_STRIPED_CLASSES = 'odd:bg-[var(--cxs-color-surface)] even:bg-[var(--cxs-color-surface-hover)]';

const BODY_CELL_BASE_CLASSES = 'px-3 py-2 align-top';
const BODY_CELL_COMPACT_CLASSES = 'px-2 py-1.5';

const ALIGN_CLASSES: Record<CxsTableAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
};

const EMPTY_ROW_CLASSES = 'text-sm text-[var(--cxs-color-on-surface-muted)]';

@Component({
  selector: 'cxs-table',
  standalone: true,
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsTableComponent {
  @Input() columns: CxsTableColumn[] = [];
  @Input() data: Array<Record<string, unknown>> = [];
  @Input() caption?: string;
  @Input() ariaLabel = 'Table';
  @Input() striped = false;
  @Input() bordered = false;
  @Input() compact = false;
  @Input() emptyMessage = 'No data available';
  @Input() emptyCell = '—';

  constructor(@Attribute('class') private readonly hostClass: string | null) {}

  get wrapperClass(): string {
    return [
      WRAPPER_BASE_CLASSES,
      this.bordered ? WRAPPER_BORDERED_CLASSES : '',
      this.hostClass
    ]
      .filter(Boolean)
      .join(' ');
  }

  get tableClass(): string {
    return [TABLE_BASE_CLASSES, this.compact ? TABLE_COMPACT_CLASSES : '']
      .filter(Boolean)
      .join(' ');
  }

  get headerRowClass(): string {
    return HEADER_ROW_CLASSES;
  }

  get bodyRowClass(): string {
    return [
      BODY_ROW_BASE_CLASSES,
      this.striped ? BODY_ROW_STRIPED_CLASSES : ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  get emptyRowClass(): string {
    return EMPTY_ROW_CLASSES;
  }

  get colSpan(): number {
    return Math.max(this.columns.length, 1);
  }

  headerCellClass(column: CxsTableColumn): string {
    return [
      HEADER_CELL_BASE_CLASSES,
      ALIGN_CLASSES[column.align ?? 'left'],
      column.headerClass ?? ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  bodyCellClass(column: CxsTableColumn): string {
    return [
      BODY_CELL_BASE_CLASSES,
      this.compact ? BODY_CELL_COMPACT_CLASSES : '',
      ALIGN_CLASSES[column.align ?? 'left'],
      column.cellClass ?? ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  cellValue(row: Record<string, unknown>, column: CxsTableColumn): string {
    const value = row[column.key];
    if (value === null || value === undefined || value === '') {
      return this.emptyCell;
    }

    return String(value);
  }
}
