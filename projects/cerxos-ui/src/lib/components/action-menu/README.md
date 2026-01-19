# Cxs Action Menu

Compact action menu with a three-dot trigger for row-level actions.

## Usage

```html
<cxs-action-menu [items]="menuItems" (itemSelected)="onAction($event)"></cxs-action-menu>
```

```ts
menuItems = [
  { label: 'Edit user', value: 'edit-user' },
  { label: 'Edit roles', value: 'edit-roles' },
  { label: 'Edit groups', value: 'edit-groups' },
  { label: 'Delete user', value: 'delete-user', tone: 'danger' }
];
```

## Inputs

- `items`: `CxsActionMenuItem[]` (default: `[]`)
- `align`: `start` | `end` (default: `end`)
- `ariaLabel`: string (default: `Open actions menu`)
- `menuLabel`: string (default: `Actions`)
- `disabled`: boolean (default: `false`)
- `floating`: boolean (default: `false`)

## Outputs

- `itemSelected`: emits when an enabled menu item is selected

## Tokens

- `--cxs-color-surface`
- `--cxs-color-surface-hover`
- `--cxs-color-on-surface`
- `--cxs-color-on-surface-muted`
- `--cxs-color-danger`
- `--cxs-color-border`
- `--cxs-color-focus`
- `--cxs-radius-md`
- `--cxs-radius-sm`
- `--cxs-shadow-sm`
