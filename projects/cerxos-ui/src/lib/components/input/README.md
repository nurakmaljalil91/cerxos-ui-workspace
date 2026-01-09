# Cxs Input

Token-driven text input component for Cerxos UI.

## Usage

```html
<cxs-input placeholder="Email" type="email"></cxs-input>
```

## Inputs

- `value`: string (default: `''`)
- `type`: `text` | `email` | `password` | `search` | `tel` | `url` | `number` (default: `text`)
- `variant`: `outline` | `filled` (default: `outline`)
- `size`: `sm` | `md` | `lg` (default: `md`)
- `disabled`: boolean (default: `false`)
- `readonly`: boolean (default: `false`)
- `required`: boolean (default: `false`)
- `invalid`: boolean (default: `false`)
- `autofocus`: boolean (default: `false`)
- `id`: string
- `name`: string
- `placeholder`: string
- `autocomplete`: string
- `inputmode`: string
- `spellcheck`: boolean | null (default: `null`)
- `ariaLabel`: string
- `ariaDescribedby`: string

## Outputs

- `valueChange`: emits the current value on input

## Tokens

- `--cxs-color-surface`
- `--cxs-color-surface-hover`
- `--cxs-color-on-surface`
- `--cxs-color-on-surface-muted`
- `--cxs-color-border`
- `--cxs-color-focus`
- `--cxs-color-danger`
- `--cxs-radius-md`
