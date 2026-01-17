# Cxs Toast

Token-driven toast notification component with optional actions.

## Usage

```html
<cxs-toast
  [(open)]="toastOpen"
  title="Saved"
  message="Changes were saved."
  variant="info"
>
  <button cxsToastAction type="button">Undo</button>
</cxs-toast>
```

## Inputs

- `open`: boolean (default: `false`)
- `title`: string | undefined
- `message`: string | undefined
- `ariaLabel`: string (default: `Notification`)
- `variant`: `info` | `neutral` | `danger` (default: `info`)
- `dismissible`: boolean (default: `true`)
- `duration`: number in ms (default: `0`, disabled)
- `position`: `bottom-right` | `bottom` | `bottom-left` | `top-right` | `top` | `top-left` | `right` | `left` | `center` (default: `bottom-right`)
- `maxWidth`: `sm` | `md` | `lg` | `xl` | `none` (default: `sm`)

## Outputs

- `openChange`: emits `false` when the toast closes
- `dismissed`: emits close reason (`dismiss`, `timeout`)

## Tokens

- `--cxs-color-primary`
- `--cxs-color-primary-ghost`
- `--cxs-color-surface`
- `--cxs-color-surface-hover`
- `--cxs-color-on-surface`
- `--cxs-color-on-surface-muted`
- `--cxs-color-border`
- `--cxs-color-danger`
- `--cxs-color-focus`
- `--cxs-radius-md`
- `--cxs-shadow-sm`
