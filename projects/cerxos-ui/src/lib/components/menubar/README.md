# Cxs Menubar

Token-driven menubar/navigation component for Cerxos UI.

## Usage

```html
<cxs-menubar [items]="menuItems"></cxs-menubar>
```

```ts
menuItems = [
  { label: 'Overview', href: '/overview', active: true },
  { label: 'People', href: '/people' },
  { label: 'Settings', href: '/settings' },
  { label: 'Create' }
];
```

## Inputs

- `items`: `CxsMenubarItem[]` (default: `[]`)
- `ariaLabel`: string (default: `Menubar`)
- `size`: `sm` | `md` | `lg` (default: `md`)
- `variant`: `default` | `surface` (default: `default`)
- `disabled`: boolean (default: `false`)

## Outputs

- `itemSelected`: emits when a non-disabled item is activated

## Tokens

- `--cxs-color-primary`
- `--cxs-color-primary-ghost`
- `--cxs-color-surface`
- `--cxs-color-surface-hover`
- `--cxs-color-on-surface`
- `--cxs-color-on-surface-muted`
- `--cxs-color-border`
- `--cxs-color-focus`
- `--cxs-radius-md`
- `--cxs-shadow-sm`
