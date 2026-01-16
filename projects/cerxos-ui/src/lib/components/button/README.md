# Cxs Button

Token-driven button component for Cerxos UI.

## Usage

```html
<cxs-button variant="primary" size="md">Save</cxs-button>
```

With icon:

```html
<cxs-button variant="secondary">
  <svg cxsButtonIcon aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="currentColor"></circle>
  </svg>
  Continue
</cxs-button>
```

## Inputs

- `variant`: `primary` | `secondary` | `ghost` (default: `primary`)
- `size`: `sm` | `md` | `lg` (default: `md`)
- `disabled`: boolean (default: `false`)
- `loading`: boolean (default: `false`)
- `type`: `button` | `submit` | `reset` (default: `button`)

## Tokens

- `--cxs-color-primary`
- `--cxs-color-primary-hover`
- `--cxs-color-primary-ghost`
- `--cxs-color-on-primary`
- `--cxs-color-surface`
- `--cxs-color-surface-hover`
- `--cxs-color-on-surface`
- `--cxs-color-border`
- `--cxs-color-focus`
- `--cxs-radius-md`
- `--cxs-shadow-sm`
