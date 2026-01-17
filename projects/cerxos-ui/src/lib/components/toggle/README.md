# Cxs Toggle

Token-driven toggle switch component.

## Usage

```html
<cxs-toggle [(checked)]="emailAlerts" label="Email alerts"></cxs-toggle>
```

## Inputs

- `checked`: boolean (default: `false`)
- `disabled`: boolean (default: `false`)
- `size`: `sm` | `md` | `lg` (default: `md`)
- `label`: string | undefined
- `ariaLabel`: string (default: `Toggle`)

## Outputs

- `checkedChange`: emits when the toggle changes

## Tokens

- `--cxs-color-primary`
- `--cxs-color-on-primary`
- `--cxs-color-surface`
- `--cxs-color-on-surface`
- `--cxs-color-on-surface-muted`
- `--cxs-color-border`
- `--cxs-color-focus`
