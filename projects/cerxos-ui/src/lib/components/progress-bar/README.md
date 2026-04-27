# Cxs Progress Bar

Token-driven progress bar component for Cerxos UI.

## Usage

```html
<cxs-progress-bar [value]="72" label="Workspace adoption" [showValue]="true"></cxs-progress-bar>
```

Indeterminate:

```html
<cxs-progress-bar label="Syncing workspace" [indeterminate]="true" [showValue]="true"></cxs-progress-bar>
```

## Inputs

- `value`: number (default: `0`)
- `max`: number (default: `100`)
- `variant`: `primary` | `neutral` | `danger` (default: `primary`)
- `size`: `sm` | `md` | `lg` (default: `md`)
- `label`: string | undefined
- `showValue`: boolean (default: `false`)
- `indeterminate`: boolean (default: `false`)
- `ariaLabel`: string (default: `Progress`)

## Tokens

- `--cxs-color-primary`
- `--cxs-color-danger`
- `--cxs-color-surface-hover`
- `--cxs-color-on-surface`
- `--cxs-color-on-surface-muted`
- `--cxs-radius-md`
