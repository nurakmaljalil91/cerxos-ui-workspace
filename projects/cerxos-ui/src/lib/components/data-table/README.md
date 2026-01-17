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

- `pageSize`: number (default: `10`)
- `pageIndex`: number (default: `1`)
- `pageSizeOptions`: number[] (default: `[10, 20, 50]`)
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
- `pageSizeChange`: emits new page size
- `sortChange`: emits `{ key, direction }`
- `filterChange`: emits `{ global, columns }`
- `selectionChange`: emits selected keys
- `bulkAction`: emits `{ id, selected }`

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
