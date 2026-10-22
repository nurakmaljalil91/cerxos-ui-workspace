# Cxs Textarea

Token-driven multi-line text input for Cerxos UI. Works with `ngModel` and reactive forms.

## Usage

```html
<cxs-textarea label="Description" [rows]="4" formControlName="description"></cxs-textarea>

<cxs-textarea label="Bio" [invalid]="true">
  <span cxsTextareaError>Bio must be under 500 characters.</span>
</cxs-textarea>
```

## Inputs

- `value`: string (default: `''`)
- `variant`: `outline` | `filled` (default: `outline`)
- `size`: `sm` | `md` | `lg` (default: `md`)
- `rows`: number of visible lines (default: `3`)
- `resize`: `vertical` | `none` (default: `vertical`)
- `disabled`: boolean (default: `false`)
- `readonly`: boolean (default: `false`)
- `required`: boolean (default: `false`)
- `invalid`: boolean (default: `false`)
- `label`: string
- `id`: string
- `name`: string
- `placeholder`: string
- `maxlength`: number
- `spellcheck`: boolean | null (default: `null`)
- `ariaLabel`: string (used when no `label` is set)
- `ariaDescribedby`: string

## Outputs

- `valueChange`: emits the current value on input

## Content projection

- `[cxsTextareaError]`: error message shown when `invalid` is `true`; linked through `aria-describedby`

## Accessibility

- The visible label is linked with `for` and `aria-labelledby`.
- `invalid` sets `aria-invalid="true"` and links the projected error.
- Tab moves focus out of the field; Enter inserts a new line.

## Tokens

- `--cxs-color-surface`
- `--cxs-color-surface-hover`
- `--cxs-color-on-surface`
- `--cxs-color-on-surface-muted`
- `--cxs-color-border`
- `--cxs-color-focus`
- `--cxs-color-danger`
- `--cxs-radius-md`
