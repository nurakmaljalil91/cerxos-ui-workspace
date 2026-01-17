# Cxs Data Table

Data table with sorting, pagination, and loading support.

## Usage

```html
<cxs-data-table
  [columns]="columns"
  [data]="rows"
  caption="Project status"
  [striped]="true"
  [bordered]="true"
></cxs-data-table>
```

```ts
columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'updated', label: 'Updated', align: 'right', sortable: true }
];
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

## Outputs

- `pageChange`: emits new page index
- `pageSizeChange`: emits new page size
- `sortChange`: emits `{ key, direction }`

## Column config

- `key`: string (required)
- `label`: string (required)
- `align`: `left` | `center` | `right`
- `width`: string (CSS width, e.g. `120px` or `20%`)
- `sortable`: boolean
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
