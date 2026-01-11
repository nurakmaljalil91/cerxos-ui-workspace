# Cxs Checkbox

Token-driven checkbox component for Cerxos UI.

## Usage

```html
<cxs-checkbox [(ngModel)]="accepted" label="Accept terms"></cxs-checkbox>
<cxs-checkbox [indeterminate]="true">Mixed state</cxs-checkbox>
```

## Inputs

- `checked`: boolean (default: `false`)
- `indeterminate`: boolean (default: `false`)
- `disabled`: boolean (default: `false`)
- `label`: string | undefined
- `size`: `sm` | `md` | `lg` (default: `md`)

## Outputs

- `valueChange`: emits the checked state as a boolean
