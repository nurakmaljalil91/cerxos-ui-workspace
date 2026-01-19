import { NgTemplateOutlet } from '@angular/common';
import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { CxsDataTableCellDirective } from './data-table-cell.directive';
import type { CxsDataTableCellContext } from './data-table-cell.directive';

export type CxsDataTableAlign = 'left' | 'center' | 'right';
export type CxsDataTableSortDirection = 'asc' | 'desc';
export type CxsDataTableFilterType = 'text' | 'select' | 'number';
export type CxsDataTablePin = 'left' | 'right';

export interface CxsDataTableColumn {
  key: string;
  label: string;
  align?: CxsDataTableAlign;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: CxsDataTableFilterType;
  filterOptions?: Array<{ label: string; value: string }>;
  resizable?: boolean;
  pinned?: CxsDataTablePin;
  visible?: boolean;
  minWidth?: number;
  headerClass?: string;
  cellClass?: string;
  formatter?: (value: unknown, row: Record<string, unknown>) => string;
}

export interface CxsDataTableSort {
  key: string;
  direction: CxsDataTableSortDirection;
}

const WRAPPER_BASE_CLASSES = 'w-full overflow-x-auto';
const WRAPPER_OVERFLOW_HIDDEN_CLASSES = 'overflow-y-hidden';
const WRAPPER_OVERFLOW_VISIBLE_CLASSES = 'overflow-y-visible';
const WRAPPER_BORDERED_CLASSES =
  'rounded-[var(--cxs-radius-md)] border border-[var(--cxs-color-border)]';

const TABLE_BASE_CLASSES =
  'w-full min-w-[max-content] border-collapse text-sm text-[var(--cxs-color-on-surface)]';
const TABLE_COMPACT_CLASSES = 'text-xs';

const HEADER_ROW_CLASSES =
  'border-b border-[var(--cxs-color-border)] text-xs font-semibold ' +
  'text-[var(--cxs-color-on-surface-muted)]';
const HEADER_CELL_BASE_CLASSES = 'px-3 py-2 text-left';
const COLUMN_BORDER_CLASSES = 'border-l border-[var(--cxs-color-border)] first:border-l-0';
const HEADER_BUTTON_CLASSES =
  'inline-flex items-center gap-2 rounded-[var(--cxs-radius-md)] px-2 py-1 ' +
  'transition-colors hover:bg-[var(--cxs-color-surface-hover)] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--cxs-color-focus)]';
const HEADER_FILTER_INPUT_CLASSES =
  'w-full rounded-[var(--cxs-radius-md)] border border-[var(--cxs-color-border)] ' +
  'bg-[var(--cxs-color-surface)] px-2 py-1 text-xs text-[var(--cxs-color-on-surface)] ' +
  'placeholder:text-[var(--cxs-color-on-surface-muted)] focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-[var(--cxs-color-focus)]';

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
const TOOLBAR_CLASSES =
  'mb-3 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--cxs-color-on-surface)]';
const TOOLBAR_GROUP_CLASSES = 'flex flex-wrap items-center gap-2';
const TOOLBAR_INPUT_CLASSES =
  'w-full rounded-[var(--cxs-radius-md)] border border-[var(--cxs-color-border)] ' +
  'bg-[var(--cxs-color-surface)] pl-9 pr-3 py-2 text-sm text-[var(--cxs-color-on-surface)] ' +
  'placeholder:text-[var(--cxs-color-on-surface-muted)] focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-[var(--cxs-color-focus)]';
const TOOLBAR_INPUT_INLINE_CLASSES =
  'w-full sm:w-64 rounded-[var(--cxs-radius-md)] border border-[var(--cxs-color-border)] ' +
  'bg-[var(--cxs-color-surface)] pl-9 pr-3 py-2 text-sm text-[var(--cxs-color-on-surface)] ' +
  'placeholder:text-[var(--cxs-color-on-surface-muted)] focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-[var(--cxs-color-focus)]';
const TOOLBAR_INPUT_WRAPPER_CLASSES = 'relative';
const TOOLBAR_INPUT_ICON_CLASSES =
  'pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--cxs-color-on-surface-muted)';
const TOOLBAR_BUTTON_CLASSES =
  'inline-flex items-center justify-center rounded-[var(--cxs-radius-md)] border border-[var(--cxs-color-border)] ' +
  'px-3 py-2 text-sm transition-colors hover:bg-[var(--cxs-color-surface-hover)]';
const TITLE_BAR_CLASSES = 'mb-3 flex flex-wrap items-start justify-between gap-3';
const TITLE_TEXT_CLASSES = 'text-base font-semibold text-(--cxs-color-on-surface)';
const SUBTITLE_TEXT_CLASSES = 'text-sm text-(--cxs-color-on-surface-muted)';
const BULK_BAR_CLASSES =
  'mb-3 flex flex-wrap items-center justify-between gap-3 rounded-[var(--cxs-radius-md)] ' +
  'border border-[var(--cxs-color-border)] bg-[var(--cxs-color-surface)] px-3 py-2 text-sm';
const RESIZE_HANDLE_CLASSES =
  'absolute right-0 top-0 h-full w-2 cursor-col-resize touch-none';

@Component({
  selector: 'cxs-data-table',
  standalone: true,
  templateUrl: './data-table.component.html',
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsDataTableComponent implements OnChanges {
  @Input() columns: CxsDataTableColumn[] = [];
  @Input() data: Array<Record<string, unknown>> = [];
  @Input() caption?: string;
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() ariaLabel = 'Data table';
  @Input() striped = false;
  @Input() bordered = false;
  @Input() compact = false;
  @Input() loading = false;
  @Input() emptyMessage = 'No data available';
  @Input() emptyCell = '—';
  @Input() allowOverflow = false;
  @Input() columnBorders = false;

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

  @Input() showToolbar = true;
  @Input() showFilters = true;
  @Input() showColumnVisibility = true;
  @Input() showGlobalSearch = true;
  @Input() manualFilter = false;

  @Input() selectable = false;
  @Input() rowKey = 'id';
  @Input() selectedKeys: Array<string | number> = [];
  @Input() bulkActions: Array<{ id: string; label: string }> = [];

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<CxsDataTableSort>();
  @Output() filterChange = new EventEmitter<{
    global: string;
    columns: Record<string, string>;
  }>();
  @Output() selectionChange = new EventEmitter<Array<string | number>>();
  @Output() bulkAction = new EventEmitter<{
    id: string;
    selected: Array<Record<string, unknown>>;
  }>();

  @ContentChildren(CxsDataTableCellDirective)
  private readonly cellTemplates?: QueryList<CxsDataTableCellDirective>;

  protected currentPage = 1;
  protected currentPageSize = 10;
  protected globalFilter = '';
  protected columnFilters: Record<string, string> = {};
  protected columnVisibility: Record<string, boolean> = {};
  protected columnWidths: Record<string, string> = {};
  protected isResizing = false;
  protected resizingColumn?: string;
  protected pinnedOffsetsLeft: Record<string, number> = {};
  protected pinnedOffsetsRight: Record<string, number> = {};
  protected filtersOpen = true;

  private resizeStartX = 0;
  private resizeStartWidth = 0;

  constructor(@Attribute('class') private readonly hostClass: string | null) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageIndex']) {
      this.currentPage = Math.max(1, this.pageIndex);
    }
    if (changes['pageSize']) {
      this.currentPageSize = Math.max(1, this.pageSize);
    }
    if (changes['columns']) {
      this.initializeVisibility();
      this.initializeWidths();
      this.updatePinnedOffsets();
    }
    if (changes['showFilters']) {
      this.filtersOpen = this.showFilters;
    }
    if (changes['selectedKeys']) {
      this.selectedKeys = [...this.selectedKeys];
    }
  }

  get wrapperClass(): string {
    return [
      WRAPPER_BASE_CLASSES,
      this.allowOverflow ? WRAPPER_OVERFLOW_VISIBLE_CLASSES : WRAPPER_OVERFLOW_HIDDEN_CLASSES,
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

  get toolbarClass(): string {
    return TOOLBAR_CLASSES;
  }

  get toolbarGroupClass(): string {
    return TOOLBAR_GROUP_CLASSES;
  }

  get toolbarInputClass(): string {
    return TOOLBAR_INPUT_CLASSES;
  }

  get toolbarInputInlineClass(): string {
    return TOOLBAR_INPUT_INLINE_CLASSES;
  }

  get toolbarInputWrapperClass(): string {
    return TOOLBAR_INPUT_WRAPPER_CLASSES;
  }

  get toolbarInputIconClass(): string {
    return TOOLBAR_INPUT_ICON_CLASSES;
  }

  get toolbarButtonClass(): string {
    return TOOLBAR_BUTTON_CLASSES;
  }

  get titleBarClass(): string {
    return TITLE_BAR_CLASSES;
  }

  get titleTextClass(): string {
    return TITLE_TEXT_CLASSES;
  }

  get subtitleTextClass(): string {
    return SUBTITLE_TEXT_CLASSES;
  }

  get bulkBarClass(): string {
    return BULK_BAR_CLASSES;
  }

  get resizeHandleClass(): string {
    return RESIZE_HANDLE_CLASSES;
  }

  get colSpan(): number {
    return Math.max(this.visibleColumns.length + (this.selectable ? 1 : 0), 1);
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
    const filtered = this.manualFilter ? this.data : this.getFilteredData(this.data);
    const sorted = this.manualSort ? filtered : this.getSortedData(filtered);
    if (this.manualPagination) {
      return sorted;
    }

    const start = (this.currentPage - 1) * this.currentPageSize;
    return sorted.slice(start, start + this.currentPageSize);
  }

  get visibleColumns(): CxsDataTableColumn[] {
    return this.columns.filter((column) => this.columnVisibility[column.key] !== false);
  }

  get selectedCount(): number {
    return this.selectedKeys.length;
  }

  get hasTitleBlock(): boolean {
    return Boolean(this.title || this.subtitle);
  }

  get allVisibleSelected(): boolean {
    if (!this.displayRows.length) {
      return false;
    }

    return this.displayRows.every((row) => this.isSelected(row));
  }

  get someVisibleSelected(): boolean {
    return this.displayRows.some((row) => this.isSelected(row)) && !this.allVisibleSelected;
  }

  headerCellClass(column: CxsDataTableColumn): string {
    return [
      HEADER_CELL_BASE_CLASSES,
      this.columnBorders ? COLUMN_BORDER_CLASSES : '',
      ALIGN_CLASSES[column.align ?? 'left'],
      column.headerClass ?? ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  headerButtonClass(): string {
    return HEADER_BUTTON_CLASSES;
  }

  headerFilterInputClass(): string {
    return HEADER_FILTER_INPUT_CLASSES;
  }

  bodyCellClass(column: CxsDataTableColumn): string {
    return [
      BODY_CELL_BASE_CLASSES,
      this.compact ? BODY_CELL_COMPACT_CLASSES : '',
      this.columnBorders ? COLUMN_BORDER_CLASSES : '',
      ALIGN_CLASSES[column.align ?? 'left'],
      column.cellClass ?? ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  cellTemplate(columnKey: string): TemplateRef<CxsDataTableCellContext> | null {
    if (!this.cellTemplates) {
      return null;
    }

    return this.cellTemplates.find((template) => template.columnKey === columnKey)?.template ?? null;
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

  columnWidth(column: CxsDataTableColumn): string | null {
    return this.columnWidths[column.key] ?? column.width ?? null;
  }

  columnMinWidth(column: CxsDataTableColumn): string | null {
    if (column.minWidth) {
      return `${column.minWidth}px`;
    }
    return null;
  }

  pinnedStyle(column: CxsDataTableColumn): Record<string, string> | null {
    if (!column.pinned) {
      return null;
    }

    if (column.pinned === 'left') {
      return { left: `${this.pinnedOffsetsLeft[column.key] ?? 0}px` };
    }

    return { right: `${this.pinnedOffsetsRight[column.key] ?? 0}px` };
  }

  pinnedLeft(column: CxsDataTableColumn): string | null {
    const style = this.pinnedStyle(column);
    return style ? style['left'] ?? null : null;
  }

  pinnedRight(column: CxsDataTableColumn): string | null {
    const style = this.pinnedStyle(column);
    return style ? style['right'] ?? null : null;
  }

  pinnedClass(column: CxsDataTableColumn): string {
    if (!column.pinned) {
      return '';
    }

    return 'sticky z-10';
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

  onGlobalFilterChange(value: string): void {
    this.globalFilter = value;
    this.emitFilterChange();
    this.goToPage(1);
  }

  onColumnFilterChange(columnKey: string, value: string): void {
    this.columnFilters[columnKey] = value;
    this.emitFilterChange();
    this.goToPage(1);
  }

  columnFilterValue(columnKey: string): string {
    return this.columnFilters[columnKey] || '';
  }

  toggleColumnVisibility(columnKey: string): void {
    this.columnVisibility[columnKey] = !this.columnVisibility[columnKey];
    this.updatePinnedOffsets();
  }

  toggleSelectAll(): void {
    if (this.allVisibleSelected) {
      this.selectedKeys = this.selectedKeys.filter(
        (key) => !this.displayRows.some((row) => this.rowIdentifier(row) === key)
      );
    } else {
      const keysToAdd = this.displayRows
        .map((row) => this.rowIdentifier(row))
        .filter((key) => !this.selectedKeys.includes(key));
      this.selectedKeys = [...this.selectedKeys, ...keysToAdd];
    }

    this.selectionChange.emit([...this.selectedKeys]);
  }

  toggleRowSelection(row: Record<string, unknown>): void {
    const key = this.rowIdentifier(row);
    if (this.selectedKeys.includes(key)) {
      this.selectedKeys = this.selectedKeys.filter((id) => id !== key);
    } else {
      this.selectedKeys = [...this.selectedKeys, key];
    }

    this.selectionChange.emit([...this.selectedKeys]);
  }

  isSelected(row: Record<string, unknown>): boolean {
    return this.selectedKeys.includes(this.rowIdentifier(row));
  }

  runBulkAction(actionId: string): void {
    this.bulkAction.emit({
      id: actionId,
      selected: this.data.filter((row) => this.selectedKeys.includes(this.rowIdentifier(row)))
    });
  }

  onResizeStart(event: MouseEvent, column: CxsDataTableColumn): void {
    if (column.resizable === false) {
      return;
    }

    event.preventDefault();
    const header = (event.target as HTMLElement).closest('th') as HTMLElement | null;
    if (!header) {
      return;
    }

    this.isResizing = true;
    this.resizingColumn = column.key;
    this.resizeStartX = event.clientX;
    this.resizeStartWidth = header.getBoundingClientRect().width;

    const onMove = (moveEvent: MouseEvent) => {
      if (!this.isResizing || !this.resizingColumn) {
        return;
      }
      const delta = moveEvent.clientX - this.resizeStartX;
      const minWidth = column.minWidth ?? 80;
      const nextWidth = Math.max(minWidth, this.resizeStartWidth + delta);
      this.columnWidths[this.resizingColumn] = `${Math.round(nextWidth)}px`;
      this.updatePinnedOffsets();
    };

    const onUp = () => {
      this.isResizing = false;
      this.resizingColumn = undefined;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
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

  private getFilteredData(rows: Array<Record<string, unknown>>): Array<Record<string, unknown>> {
    const global = this.globalFilter.trim().toLowerCase();
    const filters = this.columnFilters;

    return rows.filter((row) => {
      if (global) {
        const matchesGlobal = this.visibleColumns.some((column) => {
          const value = row[column.key];
          return String(value ?? '').toLowerCase().includes(global);
        });
        if (!matchesGlobal) {
          return false;
        }
      }

      return this.visibleColumns.every((column) => {
        if (!column.filterable) {
          return true;
        }
        const filterValue = (filters[column.key] ?? '').trim().toLowerCase();
        if (!filterValue) {
          return true;
        }
        const raw = row[column.key];
        const normalized = String(raw ?? '').toLowerCase();
        if (column.filterType === 'select') {
          return normalized === filterValue;
        }
        return normalized.includes(filterValue);
      });
    });
  }

  private emitFilterChange(): void {
    this.filterChange.emit({
      global: this.globalFilter,
      columns: { ...this.columnFilters }
    });
  }

  private initializeVisibility(): void {
    this.columnVisibility = this.columns.reduce((acc, column) => {
      acc[column.key] = column.visible !== false;
      return acc;
    }, {} as Record<string, boolean>);
  }

  private initializeWidths(): void {
    this.columnWidths = this.columns.reduce((acc, column) => {
      if (column.width) {
        acc[column.key] = column.width;
      }
      return acc;
    }, {} as Record<string, string>);
  }

  private updatePinnedOffsets(): void {
    const leftOffsets: Record<string, number> = {};
    const rightOffsets: Record<string, number> = {};
    let left = 0;
    let right = 0;
    const columns = this.visibleColumns;

    columns.forEach((column) => {
      if (column.pinned === 'left') {
        leftOffsets[column.key] = left;
        left += this.getWidthValue(column);
      }
    });

    [...columns].reverse().forEach((column) => {
      if (column.pinned === 'right') {
        rightOffsets[column.key] = right;
        right += this.getWidthValue(column);
      }
    });

    this.pinnedOffsetsLeft = leftOffsets;
    this.pinnedOffsetsRight = rightOffsets;
  }

  private getWidthValue(column: CxsDataTableColumn): number {
    const width = this.columnWidths[column.key] ?? column.width;
    if (!width) {
      return 160;
    }
    const match = width.match(/(\d+)(px)?/);
    if (match) {
      return Number(match[1]);
    }
    return 160;
  }

  private rowIdentifier(row: Record<string, unknown>): string | number {
    const value = row[this.rowKey];
    if (value === undefined || value === null) {
      return JSON.stringify(row);
    }
    return value as string | number;
  }
}
