import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

export type CxsDataTableAlign = 'left' | 'center' | 'right';
export type CxsDataTableSortDirection = 'asc' | 'desc';

export interface CxsDataTableColumn {
  key: string;
  label: string;
  align?: CxsDataTableAlign;
  width?: string;
  sortable?: boolean;
  headerClass?: string;
  cellClass?: string;
  formatter?: (value: unknown, row: Record<string, unknown>) => string;
}

export interface CxsDataTableSort {
  key: string;
  direction: CxsDataTableSortDirection;
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
const HEADER_BUTTON_CLASSES =
  'inline-flex items-center uppercase gap-2 rounded-[var(--cxs-radius-md)] px-2 py-1 ' +
  'transition-colors hover:bg-[var(--cxs-color-surface-hover)] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--cxs-color-focus)]';

const BODY_ROW_BASE_CLASSES = 'border-b border-[var(--cxs-color-border)] last:border-b-0';
const BODY_ROW_STRIPED_CLASSES = 'odd:bg-[var(--cxs-color-surface)] even:bg-[var(--cxs-color-surface-hover)]';

const BODY_CELL_BASE_CLASSES = 'px-3 py-2 align-top';
const BODY_CELL_COMPACT_CLASSES = 'px-2 py-1.5';

const ALIGN_CLASSES: Record<CxsDataTableAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
};

const EMPTY_ROW_CLASSES = 'text-sm text-[var(--cxs-color-on-surface-muted)]';
const PAGINATION_CLASSES =
  'mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--cxs-color-on-surface)]';
const PAGE_BUTTON_CLASSES =
  'inline-flex items-center justify-center rounded-[var(--cxs-radius-md)] border border-[var(--cxs-color-border)] ' +
  'px-3 py-1.5 text-sm transition-colors hover:bg-[var(--cxs-color-surface-hover)] ' +
  'disabled:cursor-not-allowed disabled:opacity-60';
const PAGE_SELECT_CLASSES =
  'rounded-[var(--cxs-radius-md)] border border-[var(--cxs-color-border)] bg-[var(--cxs-color-surface)] ' +
  'px-2 py-1 text-sm';

@Component({
  selector: 'cxs-data-table',
  standalone: true,
  templateUrl: './data-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsDataTableComponent implements OnChanges {
  @Input() columns: CxsDataTableColumn[] = [];
  @Input() data: Array<Record<string, unknown>> = [];
  @Input() caption?: string;
  @Input() ariaLabel = 'Data table';
  @Input() striped = false;
  @Input() bordered = false;
  @Input() compact = false;
  @Input() loading = false;
  @Input() emptyMessage = 'No data available';
  @Input() emptyCell = '—';

  @Input() pageSize = 10;
  @Input() pageIndex = 1;
  @Input() pageSizeOptions: number[] = [10, 20, 50];
  @Input() showPagination = true;
  @Input() showPageSize = true;
  @Input() manualPagination = false;
  @Input() total?: number;

  @Input() sortKey?: string;
  @Input() sortDirection: CxsDataTableSortDirection = 'asc';
  @Input() manualSort = false;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<CxsDataTableSort>();

  protected currentPage = 1;
  protected currentPageSize = 10;

  constructor(@Attribute('class') private readonly hostClass: string | null) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageIndex']) {
      this.currentPage = Math.max(1, this.pageIndex);
    }
    if (changes['pageSize']) {
      this.currentPageSize = Math.max(1, this.pageSize);
    }
  }

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

  get paginationClass(): string {
    return PAGINATION_CLASSES;
  }

  get pageButtonClass(): string {
    return PAGE_BUTTON_CLASSES;
  }

  get pageSelectClass(): string {
    return PAGE_SELECT_CLASSES;
  }

  get colSpan(): number {
    return Math.max(this.columns.length, 1);
  }

  get totalItems(): number {
    if (this.manualPagination && this.total !== undefined) {
      return this.total;
    }

    return this.data.length;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.currentPageSize));
  }

  get pageLabel(): string {
    return `Page ${this.currentPage} of ${this.totalPages}`;
  }

  get displayRows(): Array<Record<string, unknown>> {
    const sorted = this.manualSort ? this.data : this.getSortedData(this.data);
    if (this.manualPagination) {
      return sorted;
    }

    const start = (this.currentPage - 1) * this.currentPageSize;
    return sorted.slice(start, start + this.currentPageSize);
  }

  headerCellClass(column: CxsDataTableColumn): string {
    return [
      HEADER_CELL_BASE_CLASSES,
      ALIGN_CLASSES[column.align ?? 'left'],
      column.headerClass ?? ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  headerButtonClass(): string {
    return HEADER_BUTTON_CLASSES;
  }

  bodyCellClass(column: CxsDataTableColumn): string {
    return [
      BODY_CELL_BASE_CLASSES,
      this.compact ? BODY_CELL_COMPACT_CLASSES : '',
      ALIGN_CLASSES[column.align ?? 'left'],
      column.cellClass ?? ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  cellValue(row: Record<string, unknown>, column: CxsDataTableColumn): string {
    const value = row[column.key];
    if (column.formatter) {
      return column.formatter(value, row);
    }

    if (value === null || value === undefined || value === '') {
      return this.emptyCell;
    }

    return String(value);
  }

  ariaSort(column: CxsDataTableColumn): 'ascending' | 'descending' | 'none' | null {
    if (!column.sortable) {
      return null;
    }

    if (this.sortKey !== column.key) {
      return 'none';
    }

    return this.sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  onSort(column: CxsDataTableColumn): void {
    if (!column.sortable) {
      return;
    }

    if (this.sortKey === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = column.key;
      this.sortDirection = 'asc';
    }

    this.sortChange.emit({
      key: this.sortKey,
      direction: this.sortDirection
    });
  }

  goToPage(page: number): void {
    const nextPage = Math.min(Math.max(1, page), this.totalPages);
    this.currentPage = nextPage;
    this.pageChange.emit(nextPage);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  onPageSizeChange(value: string): void {
    const nextSize = Number(value);
    if (!Number.isFinite(nextSize) || nextSize <= 0) {
      return;
    }

    this.currentPageSize = nextSize;
    this.pageSizeChange.emit(nextSize);
    this.goToPage(1);
  }

  private getSortedData(rows: Array<Record<string, unknown>>): Array<Record<string, unknown>> {
    if (!this.sortKey) {
      return rows;
    }

    const direction = this.sortDirection === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => {
      const valueA = a[this.sortKey ?? ''];
      const valueB = b[this.sortKey ?? ''];
      const normalizedA = valueA === null || valueA === undefined ? '' : String(valueA);
      const normalizedB = valueB === null || valueB === undefined ? '' : String(valueB);
      return normalizedA.localeCompare(normalizedB, undefined, { numeric: true }) * direction;
    });
  }
}
