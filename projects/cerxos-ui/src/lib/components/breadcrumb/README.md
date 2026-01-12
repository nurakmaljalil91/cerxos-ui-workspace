# Cxs Breadcrumb

Token-driven breadcrumb navigation component for Cerxos UI.

## Usage

```html
<cxs-breadcrumb [items]="items"></cxs-breadcrumb>
```

## Inputs

- `items`: `CxsBreadcrumbItem[]` (default: `[]`)
- `separator`: string (default: `/`)
- `ariaLabel`: string (default: `Breadcrumb`)
- `size`: `sm` | `md` | `lg` (default: `md`)
- `variant`: `default` | `muted` (default: `default`)
- `disabled`: boolean (default: `false`)

### CxsBreadcrumbItem

- `label`: string
- `href`: string
- `target`: string
- `rel`: string
- `ariaLabel`: string
- `disabled`: boolean

## Tokens

- `--cxs-color-primary`
- `--cxs-color-primary-hover`
- `--cxs-color-on-surface`
- `--cxs-color-on-surface-muted`
- `--cxs-color-focus`
- `--cxs-radius-md`
