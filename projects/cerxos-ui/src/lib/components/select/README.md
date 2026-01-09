# Cxs Select

Token-driven select component for Cerxos UI.

## Usage

```html
<cxs-select placeholder="Choose a role">
  <option value="admin">Admin</option>
  <option value="editor">Editor</option>
</cxs-select>
```

## Inputs

- `value`: string (default: `''`)
- `variant`: `outline` | `filled` (default: `outline`)
- `size`: `sm` | `md` | `lg` (default: `md`)
- `disabled`: boolean (default: `false`)
- `required`: boolean (default: `false`)
- `invalid`: boolean (default: `false`)
- `placeholder`: string
- `placeholderValue`: string (default: `''`)
- `id`: string
- `name`: string
- `ariaLabel`: string
- `ariaDescribedby`: string

## Outputs

- `valueChange`: emits the current value on change

## Notes

- The placeholder renders as a disabled option. Use `placeholderValue` that does not collide with real option values.

## Tokens

- `--cxs-color-surface`
- `--cxs-color-surface-hover`
- `--cxs-color-on-surface`
- `--cxs-color-on-surface-muted`
- `--cxs-color-border`
- `--cxs-color-focus`
- `--cxs-color-danger`
- `--cxs-radius-md`
