# Cxs Data Table

Data table with sorting, filtering, selection, column visibility, and pagination.

## Usage

```html
<cxs-data-table
  [columns]="columns"
  [data]="rows"
  caption="Project status"
  [striped]="true"
  [bordered]="true"
  [selectable]="true"
  [bulkActions]="bulkActions"
></cxs-data-table>
```

```ts
columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'status', label: 'Status', filterable: true },
  { key: 'updated', label: 'Updated', align: 'right', sortable: true }
];

bulkActions = [{ id: 'archive', label: 'Archive' }];
```

## Inputs

- `columns`: `CxsDataTableColumn[]` (default: `[]`)
- `data`: `Record<string, unknown>[]` (default: `[]`)
- `caption`: string | undefined
- `ariaLabel`: string (default: `Data table`)
- `striped`: boolean (default: `false`)
- `bordered`: boolean (default: `false`)
- `compact`: boolean (default: `false`)
- `loading`: boolean (default: `false`)
- `emptyMessage`: string (default: `No data available`)
- `emptyCell`: string (default: `—`)
- `allowOverflow`: boolean (default: `false`)
- `columnBorders`: boolean (default: `false`)

- `pageSize`: number (default: `10`; `0` means all rows)
- `pageIndex`: number (default: `1`)
- `pageSizeOptions`: `CxsDataTablePageSize[]` — numbers and/or `'all'` (default: `[10, 20, 50]`)
- `pageSizeStorageKey`: string | undefined — when set, the rows-per-page choice is saved in `localStorage` and restored on the next visit
- `showPagination`: boolean (default: `true`)
- `showPageSize`: boolean (default: `true`)
- `manualPagination`: boolean (default: `false`)
- `total`: number | undefined (used with `manualPagination`)

- `sortKey`: string | undefined
- `sortDirection`: `asc` | `desc` (default: `asc`)
- `manualSort`: boolean (default: `false`)

- `showToolbar`: boolean (default: `true`)
- `showFilters`: boolean (default: `true`)
- `showColumnVisibility`: boolean (default: `true`)
- `showGlobalSearch`: boolean (default: `true`)
- `manualFilter`: boolean (default: `false`)

- `selectable`: boolean (default: `false`)
- `rowKey`: string (default: `id`)
- `selectedKeys`: `(string | number)[]` (default: `[]`)
- `bulkActions`: `{ id: string; label: string }[]` (default: `[]`)

## Outputs

- `pageChange`: emits new page index
- `pageSizeChange`: emits new page size (`0` when the user chooses All)
- `sortChange`: emits `{ key, direction }`
- `filterChange`: emits `{ global, columns }`
- `selectionChange`: emits selected keys
- `bulkAction`: emits `{ id, selected }`

## Rows per page

Body cells are vertically centered; use a column's `align` for horizontal alignment.

Add `'all'` to `pageSizeOptions` to let users show every row:

```html
<cxs-data-table
  [columns]="columns"
  [data]="rows"
  [pageSizeOptions]="[10, 50, 100, 'all']"
  pageSizeStorageKey="orders"
></cxs-data-table>
```

- Client-side pagination: All shows every filtered row on one page.
- `manualPagination`: All emits `pageSizeChange(0)`; request every item from your API and the table
  shows a single page. `0` can be bound back into `pageSize`.
- A size change always emits `pageSizeChange(size)` first and then `pageChange(1)`.
- A saved size that is not in `pageSizeOptions` is ignored. Storage failures are ignored.

### Server-side pages

Read the saved size before the first request so the page does not load the default size first,
and reload on `pageSizeChange`:

```ts
import { readCxsDataTablePageSize } from 'cerxos-ui';

readonly pageSizeOptions: CxsDataTablePageSize[] = [10, 50, 100, 'all'];
readonly pageSize = signal(toRequestSize(readCxsDataTablePageSize('orders', this.pageSizeOptions, 10)));

onPageSizeChange(size: number): void {
  this.pageSize.set(size); // 0 = all
  this.pageNumber.set(1);
  this.load();
}
```

```html
<cxs-data-table
  [manualPagination]="true"
  [total]="total()"
  [pageIndex]="pageNumber()"
  [pageSize]="pageSize()"
  [pageSizeOptions]="pageSizeOptions"
  pageSizeStorageKey="orders"
  (pageSizeChange)="onPageSizeChange($event)"
  (pageChange)="goToPage($event)"
></cxs-data-table>
```

where `toRequestSize` maps `'all'` to `0`. The `pageChange(1)` that follows a size change can be
ignored when the page is already 1.

`writeCxsDataTablePageSize(key, size)` saves a choice; the table calls it for you when
`pageSizeStorageKey` is set.

## Columns panel

The Columns panel opens above the table and closes on an outside click or Escape (focus returns to
the Columns button).

## Column config

- `key`: string (required)
- `label`: string (required)
- `align`: `left` | `center` | `right`
- `width`: string (CSS width, e.g. `120px` or `20%`)
- `sortable`: boolean
- `filterable`: boolean
- `filterType`: `text` | `select` | `number`
- `filterOptions`: `{ label, value }[]`
- `resizable`: boolean
- `pinned`: `left` | `right`
- `visible`: boolean
- `minWidth`: number
- `headerClass`: string (optional)
- `cellClass`: string (optional)
- `formatter`: `(value, row) => string` (optional)

## Tokens

- `--cxs-color-surface`
- `--cxs-color-surface-hover`
- `--cxs-color-on-surface`
- `--cxs-color-on-surface-muted`
- `--cxs-color-border`
- `--cxs-color-focus`
- `--cxs-radius-md`
- `--cxs-shadow-sm`
