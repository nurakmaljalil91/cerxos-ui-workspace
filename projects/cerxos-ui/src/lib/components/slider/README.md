# Cxs Slider

Token-driven slider component for Cerxos UI.

## Usage

```html
<cxs-slider [value]="40" label="Volume" [showValue]="true"></cxs-slider>
```

## Inputs

- `value`: number (default: `0`)
- `min`: number (default: `0`)
- `max`: number (default: `100`)
- `step`: number (default: `1`)
- `variant`: `primary` | `danger` (default: `primary`)
- `size`: `sm` | `md` | `lg` (default: `md`)
- `disabled`: boolean (default: `false`)
- `required`: boolean (default: `false`)
- `label`: string | undefined
- `showValue`: boolean (default: `false`)
- `ariaLabel`: string (default: `Slider`)
- `ariaDescribedby`: string | undefined

## Tokens

- `--cxs-color-primary`
- `--cxs-color-danger`
- `--cxs-color-surface`
- `--cxs-color-surface-hover`
- `--cxs-color-on-surface`
- `--cxs-color-on-surface-muted`
- `--cxs-color-focus`
- `--cxs-radius-md`
- `--cxs-shadow-sm`
