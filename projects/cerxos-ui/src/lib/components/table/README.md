# Cxs Table

Simple, token-driven table component.

## Usage

```html
<cxs-table [columns]="columns" [data]="rows" caption="Team status"></cxs-table>
```

```ts
columns = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'updated', label: 'Updated', align: 'right' }
];

rows = [
  { name: 'Alpha', status: 'Active', updated: '2h ago' },
  { name: 'Beta', status: 'Paused', updated: 'Yesterday' }
];
```

## Inputs

- `columns`: `CxsTableColumn[]` (default: `[]`)
- `data`: `Record<string, unknown>[]` (default: `[]`)
- `caption`: string | undefined
- `ariaLabel`: string (default: `Table`)
- `striped`: boolean (default: `false`)
- `bordered`: boolean (default: `false`)
- `compact`: boolean (default: `false`)
- `emptyMessage`: string (default: `No data available`)
- `emptyCell`: string (default: `—`)

## Column config

- `key`: string (required)
- `label`: string (required)
- `align`: `left` | `center` | `right`
- `width`: string (CSS width, e.g. `120px` or `20%`)
- `headerClass`: string (optional)
- `cellClass`: string (optional)

## Tokens

- `--cxs-color-surface`
- `--cxs-color-surface-hover`
- `--cxs-color-on-surface`
- `--cxs-color-on-surface-muted`
- `--cxs-color-border`
- `--cxs-radius-md`
- `--cxs-shadow-sm`
